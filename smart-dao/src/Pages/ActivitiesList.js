import React from "react";
import { Link } from "react-router-dom";
import ActivityRow from "../components/ActivityRow";


import "../style/daoDashboard.css"
const ActivitiesList = () => {

  return (
    <div>
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <h1 className="page-name">Activities</h1>
      <div className="votings-container">
          <ActivityRow name="Amsterdam Basketball" description="Let's hang around and play some basketball in Amsterdam!"/>
          <ActivityRow />
          <ActivityRow />
          <ActivityRow />
      </div>
  </div>
  )
}
export default ActivitiesList;

