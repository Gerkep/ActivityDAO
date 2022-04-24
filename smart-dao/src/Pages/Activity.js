import React,{ useEffect, useState }  from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";
import { useNavigate } from 'react-router-dom';
import {ethers} from "ethers";
import ACTIVITY_ABI from "../constants/abis/Activity.json";
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';


import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
const Activity = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [transactionJoin, setTransactionJoin] = useState(null);
  const [transactionResults, setTransactionResults] = useState(null);


  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(()=> {
    if(transactionJoin){
        //console.log("hash: ", transaction.hash);
        // let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
        //   navigate(`/activity/${data}`);
        // });
      // navigate(`/activity/${id}`);
      console.log("Success transactinoJoin");
    }
    else{
        console.log("errorActivityJoin");
    }
}, [transactionJoin])

useEffect(()=> {
  if(transactionResults){
    navigate(`/results/${id}`);
    console.log("Success transactionResult");

  }
  else{
      console.log("errorActivityJoin");
  }
}, [transactionResults])

  const {account , library} = useWeb3React();

  const renderProposals = () => {
    return Proposals.map(item => {
      return(
        <VotingRow location={item.location} proposer={item.proposer} timeOptions={item.times} remainingTime={item.deadline}> </VotingRow>
      )
    })
  }
  return (
    <div>
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <button className="propose-btn" onClick={() => navigate(`/proposeTimePlace1/${id}`)}>Propose Time/Place</button>
      <button className="checkin-btn" onClick={() => navigate(`/checkin/${id}`)}>Check in</button>
      <button 
      className="getvotes-btn" 
      onClick={async () => {
        let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'getResultVoting',[]));
        //let tx = 1;  
        console.log("TX: ", tx);
        setTransactionResults(tx);
      }}      >Get results</button>
      
      <button className="joinAct-btn" 
      
      onClick={async () => {
        let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'joinActivity',[]));
        //let tx = 1;  
        console.log("TX: ", tx);
        setTransactionJoin(tx);
      }}
      >
      Join Activity</button>

      <h1 className="page-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
        {renderProposals()}
      </div>
  </div>
  )
}
export default Activity;

