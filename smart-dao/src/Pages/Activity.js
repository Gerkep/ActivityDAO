import React from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";
import { useNavigate } from 'react-router-dom';

import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
const Activity = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  const ActivityContract = new ethers.Contract("0x79cF3c6F91123c72b986921030F429CA8c8ac437", abi, provider);

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
      <h1 className="page-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
        {renderProposals()}
      </div>
  </div>
  )
}
export default Activity;

