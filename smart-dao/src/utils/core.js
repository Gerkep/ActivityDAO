import { getAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { AddressZero, MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import abi from "../constants/abis/ActivitesHall.json";
import USER_REGISTRY_ABI from "../constants/abis/UserRegistry.json";
import ACTIVITY_ABI from "../constants/abis/Activity.json";
import ACTIVITY_HALL_ABI from "../constants/abis/ActivitesHall.json";
import { NFTStorage, Bob } from "nft.storage";
import { ethers } from "ethers";
import { hexStripZeros, TransactionDescription } from "ethers/lib/utils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { VaultFactoryAddress, ActivitesHall, OurToken } from "../constants/Addresses";
import { getAvatar } from "../assets/avatar";
import axios from "axios";
import moment from 'moment';
import { Buffer } from "buffer";

export const performTx = async (
  library,
  abi,
  account,
  contractAddr,
  acccount,
  functionName,
  args
) => {
  console.log("DEBUGGING");
  console.log(library, account, contractAddr, acccount, functionName, args);
  let value = undefined;
  let contract = getContract(contractAddr, abi, library, account);

  let estimate = contract.estimateGas[functionName];
  let method = contract[functionName];
  console.log("testing here");

  let result = estimate(...args, value ? { value } : {}).then(
    (estimatedGasLimit) =>
      method(...args, {
        ...(value ? { value } : {}),
        gasLimit: calculateGasMargin(estimatedGasLimit),
      }).catch((e) => new CustomError("CustomError in transaction"))
  );

  console.log(result);
  return result;
};
export const withConfirmation = async (txpromise) => {
  const result = await txpromise;
  // await ethers.providers.waitForTransaction(
  //   result.receipt ? result.receipt.transactionHash : result.hash,
  //   3
  // );
  await result.wait();
  return result;
};
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    console.log("not working");
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function calculateGasMargin(value) {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export class CustomError {
  getErrorText() {
    return this.errorText;
  }

  constructor(errorText) {
    this.errorText = errorText;
  }
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export async function getComunnityFromTx(txHash, library) {
  const receipt = await library.getTransactionReceipt(txHash);
  console.log(receipt);
  return `0x${receipt.logs[0].data.substring(26, 66)}`;
}

export async function loadAndPublish(imageToUpload) {}
export async function publishToIPFS(metadata) {
  const ipfs = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxREVEZjVCMmI3REU3NDA1RjM4YjkwMjNhYzAxNTdFMTU3MGE1NjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDcyMTAwODQyMiwibmFtZSI6ImFtc3RlcmRhbSJ9.Sn1JCXO3xWD5tLdsCsWVRzbNyJFE1fOSQjTYzaKfEPU",
  });
  const someData = new Blob([metadata]);
  console.log(someData);
  const cid = await ipfs.storeBlob(someData);
  // console.log(cid);
  return `https://ipfs.io/ipfs/${cid}`;
}

export async function createRandomAvatar(gender, chainID, library, account) {
  let contractAddr = VaultFactoryAddress[chainID];
  console.log(contractAddr);
  if (!library) {
    library = new JsonRpcProvider(
      "https://amsterdam.skalenodes.com/v1/attractive-muscida"
    );
  }
  let contract = getContract(contractAddr, USER_REGISTRY_ABI, library);
  let generatedRandom = await contract["getRandom"]();
  let stringGenerated = generatedRandom.toString().substring(10, 15);
  stringGenerated = `0x${stringGenerated}`;
  let randomNumber = parseInt(stringGenerated, 16) % 10; //from 1 to 10
  const myAvatar = getAvatar();
  const cleanSVG = myAvatar.replace(/[\r\n]+/gm, "");
  var decoded = unescape(encodeURIComponent(cleanSVG));
  const image = "data:image/svg+xml;base64," + btoa(decoded);
  return image;
}

export async function getUserData(library, account, chainId) {
  let contractAddr = VaultFactoryAddress[chainId];
  if (!library) {
    library = new JsonRpcProvider(
      "https://amsterdam.skalenodes.com/v1/attractive-muscida"
    );
  }
  let contract = getContract(contractAddr, USER_REGISTRY_ABI, library, account);
  let userData = await contract["getUserByAddress"]();


  if(userData.imgType == 1){
    let fromIPFS = await axios.get(userData.url);
      return {
          name : userData.name,
          url : fromIPFS.data
      }
  }else{
    return {
        name : userData.name,
        url : userData.url
    }
  }

console.log('user information', userData);
}
export async function sendConfigTx(library, account, chainId, name, url, type) {
  let functionName = "modifyUser";
  let contractAddr = VaultFactoryAddress[chainId];
  let args = [url, name, type];
  let contract = getContract(contractAddr, USER_REGISTRY_ABI, library, account);
  let estimate = contract.estimateGas[functionName];
  let method = contract[functionName];
  let value = null;
  let result = estimate(...args, value ? { value } : {}).then(
    (estimatedGasLimit) =>
      method(...args, {
        ...(value ? { value } : {}),
        gasLimit: calculateGasMargin(estimatedGasLimit),
      }).catch((e) => new CustomError("CustomError in transaction"))
  );
  console.log("now performing tx");
  let final = await withConfirmation(result);
  console.log(final);
  // return url;
}
export async function editUserInfo(library, account, chainId, name, pic) {
  if (!pic) {
    pic = await createRandomAvatar(0, chainId, library, account);
    let url = await publishToIPFS(pic);
    await sendConfigTx(library, account, chainId, name, url, '1');
  } else {
    // console.log(imageToUpload);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(pic);
    reader.onloadend = async () => {
      //   console.log("Buffer data: ", Buffer(reader.result));
      publishToIPFS(pic).then((url) => {
        console.log(url);
        sendConfigTx(library, account, chainId, name, url,'0');
      });
    };
  }

  return;
}
export async function getTopActivities (library,chainID, numAct){
    if(!library){
        library = new JsonRpcProvider(
            "https://amsterdam.skalenodes.com/v1/attractive-muscida"
          );
          chainID = 0xafcee83030b95;
    }

    let cAddress = ActivitesHall[chainID]
    let contract = getContract(cAddress,ACTIVITY_HALL_ABI,library);
    let num = (await contract['getTotal']()).toNumber();
    // console.log(num.toNumber());
    let newList = [];
    for(let i=0;i<num;i++){
        let currAct = await contract['activities'](i);
        let myContract = getContract(currAct,ACTIVITY_ABI,library);
        let name = await myContract['name']();
        let deadline = await myContract['endingTimeForConsensus']();
        deadline = parseInt(deadline * 1000);
        // let dateFinal = moment(deadline).format('YYYY-MM-DD HH:mm:ss');
        newList.push(
            {
                name : name,
                deadline : deadline,
                hash : currAct
            }
        )

    }
    let now = Date.now();
    newList = newList.filter(item => item.deadline > now);
    // console.log('filteredlist',newList);
    newList = newList.sort(function(a,b){return a.deadline - b.deadline});
    newList = newList.map((item)=>{
        let dateFinal = moment(item.deadline).format('YYYY-MM-DD HH:mm:ss');
        return {
         name : item.name,
         deadline : dateFinal,
         hash : item.hash
        }
    })

    if(!numAct){
        return newList;
    }
    if(newList.length > numAct){
        newList = newList.slice(0,3);
    }
    // console.log(newList);
    return newList;
}
export async function getProposals (library,chainID, numAct, id){
    if(!library){
        library = new JsonRpcProvider(
            "https://amsterdam.skalenodes.com/v1/attractive-muscida"
          );
          chainID = 0xafcee83030b95;
    }
    let contract = getContract(id,ACTIVITY_ABI,library);
    let numLocations = (await contract['locationCursor']()).toNumber();
    console.log(numLocations);
    let newList = [];
    for(let i=0;i<numLocations;i++){
        let proposal = await contract.locationsProposed(i);
        let numDates = proposal.datesCursor.toNumber();
        let datesArray =[];
        let times =[];
        for(let j=0;j<numDates;j++){
            let currDate = await contract.getDatesProposed(i,j);
            let currDateVotes = await contract.getDatesProposedVotes(i,j);
            times.push({
                time : currDate[0].toNumber(),
                votes : currDateVotes.positiveVoteNumber.toNumber()
            })
        }
        newList.push({
            location : proposal.name,
            proposer : proposal.proposer,
            times : times
        })
    }
   return newList;
}