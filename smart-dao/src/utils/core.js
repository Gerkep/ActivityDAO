import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { BigNumber } from '@ethersproject/bignumber';
import abi from '../constants/abis/VaultFactory.json';
import { ethers } from 'ethers';
import { hexStripZeros, TransactionDescription } from 'ethers/lib/utils';

export const performTx = async (library, account, contractAddr, acccount, functionName, args) =>{
    console.log('DEBUGGING');
    console.log(library, account, contractAddr, acccount, functionName, args);
    let value = undefined;
    let contract = getContract(contractAddr,abi,library, account)

    let estimate = contract.estimateGas[functionName];
    let method = contract[functionName];
    console.log('testing here');

    let result = estimate(...args, value ? { value } : {}).then(estimatedGasLimit =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).catch(e => new CustomError('CustomError in transaction'))
      );

    console.log(result);
    return result;
}
export const withConfirmation = async (txpromise) => {
  const result = await txpromise;
  // await ethers.providers.waitForTransaction(
  //   result.receipt ? result.receipt.transactionHash : result.hash,
  //   3
  // );
  await result.wait();
  return result;

}
export function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
      console.log('not working');
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
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
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

  export async function getComunnityFromTx(txHash,library) {
      const receipt = await library.getTransactionReceipt(txHash);
      console.log(receipt);
      return `0x${receipt.logs[0].data.substring(26,66)}`;
  }