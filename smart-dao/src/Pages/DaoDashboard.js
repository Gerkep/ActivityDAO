import React from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";


import "../style/daoDashboard.css"
const DaoDashboard = () => {
  const {id} = useParams();

  return (
    <div>
      {id}
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <button className="create-idea-btn">Propose an idea</button>
      <h1 className="dao-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
          <VotingRow />
          <VotingRow />
          <VotingRow />
          <VotingRow />
      </div>
  </div>
  )
}
export default DaoDashboard;

