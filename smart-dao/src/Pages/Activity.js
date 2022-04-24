import React,{ useEffect, useState }  from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";
import { useNavigate } from 'react-router-dom';
import {ethers} from "ethers"
import ACTIVITY_ABI from "../constants/abis/Activity.json";
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';


import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
const Activity = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(()=> {
    if(transaction){
        //console.log("hash: ", transaction.hash);
        // let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
        //   navigate(`/activity/${data}`);
        // });
      // navigate(`/activity/${id}`);
      console.log("Success");
    }
    else{
        console.log("error");
    }
}, [transaction])
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
      <button className="getvotes-btn" onClick={() => navigate(`/results/${id}`)}>Get results</button>
      
      <button className="joinAct-btn" 
      
      onClick={async () => {
        let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'joinActivity',[]));
        //let tx = 1;  
        console.log("TX: ", tx);
        setTransaction(tx);
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

