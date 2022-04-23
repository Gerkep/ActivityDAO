import React from "react";
import { Link } from "react-router-dom";
import ActivityRow from "../components/ActivityRow";
import { Activities } from "../constants/SampleActivities";

import "../style/daoDashboard.css"
const ActivitiesList = () => {


  const generateActivitiesList = () => {
    return Activities.map(activity => {
      return (
          <ActivityRow key={activity.hash} name={activity.name} description={activity.description} hash={activity.hash}/>
      )
  })
  }


  return (
    <div>
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <h1 className="page-name">Activities</h1>
      <div className="votings-container">
          {generateActivitiesList()}
      </div>
  </div>
  )
}
export default ActivitiesList;

