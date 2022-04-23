import React from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";
import { useNavigate } from 'react-router-dom';

import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
const Activity = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const renderProposals = () => {
    return Proposals.map(item => {
      return(
        <VotingRow location={item.location} proposer={item.proposer} timeOptions={item.times} remainingTime={item.deadline}> </VotingRow>
      )
    })
  }
  return (
    <div>
      {id}
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <Link to="/proposeTimePlace" type="button" className='create-idea-btn'>Propose Time/Place</Link>
      <button className="checkin-btn" onClick={() => navigate(`/checkin/${id}`)}>Check in</button>
      <h1 className="page-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
        {renderProposals()}
      </div>
  </div>
  )
}
export default Activity;

