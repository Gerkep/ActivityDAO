import React from "react";
import { Link } from "react-router-dom";
import VotingRow from "../components/VotingRow";


import "../style/daoDashboard.css"
const ActivitiesList = () => {

  return (
    <div>
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <h1 className="dao-name">Activities</h1>
      <div className="votings-container">
          <VotingRow />
          <VotingRow />
          <VotingRow />
          <VotingRow />
      </div>
  </div>
  )
}
export default ActivitiesList;

