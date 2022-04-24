import React ,{ useEffect, useState } from 'react';
import "../style/checkinPage.css"
import "../style/result.css"
import { Link, useParams } from 'react-router-dom';
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import ACTIVITY_ABI from "../constants/abis/Activity.json";
import {ethers} from "ethers"
import { useNavigate } from 'react-router-dom';



const Checkin = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const conensusReached = true;
    const [transaction, setTransaction] = useState(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    useEffect(()=> {
        if(transaction){
            //console.log("hash: ", transaction.hash);
            // let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
            //   navigate(`/activity/${data}`);
            // });
          navigate(`/activity/${id}`); 
          console.log("SuccessClaimUnused");
        }
        else{
            console.log("errorClaimUnused");
        }
    }, [transaction])

    const {account , library} = useWeb3React();


        return(
            <div className='checkin-page'>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                <Link to={`/activity/${id}`} className='close-btn'>X</Link>
                <h1 className='checkin-header'>Results Are Here!</h1>
                <div className='checkin-input'>
                    {conensusReached ? <h2 className='result-message'>Reached</h2> : <h2 className='result-message'>Not Reached</h2>}
                    <button className='stake-claim-btn'
                    
                    
                    onClick={async () => {
                        let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'claimUnusedStaking',[]));
                        //let tx = 1;  
                        console.log("TX: ", tx);
                        setTransaction(tx);
                      }}
                    
                    >Claim Unused Stake</button>
                </div>
                
                </div>
            </div>
        );
}

export default Checkin;