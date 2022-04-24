import React,{ useEffect, useState }  from 'react';
import "../style/checkinPage.css"
import { Link, useParams } from 'react-router-dom';
import { FakeAddresses } from '../constants/FakeAddresses';

import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import ACTIVITY_ABI from "../constants/abis/Activity.json";
import {ethers} from "ethers"
import { useNavigate } from 'react-router-dom';

const Checkin = () => {
    const generateAddresses = () => {
          return FakeAddresses.map(address => {
            return (
                <div className='checkin-input'>
                    <p className='address-input'>{address.address}</p>
                    <input type="checkbox" className='checkin-checkbox'/>
                </div>
            )
        })
        
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [transactionClaimStake, setTransactionClaimStake] = useState(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    useEffect(()=> {
        if(transactionClaimStake){
            //console.log("hash: ", transaction.hash);
            // let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
            //   navigate(`/activity/${data}`);
            // });
          navigate(`/activity/${id}`); 
          console.log("Successtransactionclaimstake");
        }
        else{
            console.log("errortransactionclaimstake");
        }
    }, [transactionClaimStake])

    const {account , library} = useWeb3React();

        return(
            <div className='checkin-page'>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                <Link to={`/activity/${id}`} className='close-btn'>X</Link>
                <h1 className='checkin-header'>Check in Participant Address</h1>
                <div className='addresses-list'>
                    {generateAddresses()}
                </div>
                <button className='stake-claim-btn'>Check-in</button>
                <button className='stake-claim-btn'
                
                onClick={async () => {
                    let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'claimStake',[]));
                    //let tx = 1;  
                    console.log("TX: ", tx);
                    setTransactionClaimStake(tx);
                  }}
                
                
                
                >Claim staking</button>

                </div>
            </div>
        );
}

export default Checkin;