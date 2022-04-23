import React from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";


import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
const Activity = () => {
  const {id} = useParams();

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
      <button className="create-idea-btn">Propose an idea</button>
      <Link to="/checkin" className="checkin-btn">Check in</Link>
      <h1 className="page-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
        {renderProposals()}
      </div>
  </div>
  )
}
export default Activity;

