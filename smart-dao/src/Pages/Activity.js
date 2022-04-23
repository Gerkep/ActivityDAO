import React from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";


import "../style/daoDashboard.css"
const Activity = () => {
  const {id} = useParams();

  return (
    <div>
      {id}
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <button className="create-idea-btn">Propose an idea</button>
      <h1 className="page-name">Barcelona Soccer Team</h1>
      <div className="votings-container">
          <VotingRow name="Match Sunday at 5PM?" description="regreg eger5g4 45g 4etwhgwtrhgsf hgfdh gnsfbdg rsthsryn s sdfg snhyrtsh sfg" votes={13} votesGoal={21}/>
          <VotingRow name="Basketball tomorrow?" description="regrehgsf hgfdh gnsfbdg rsthsryn s sdfg snhyrtsh sfg" votes={3} votesGoal={11}/>
          <VotingRow name="Basketball tomorrow?" description="regrehgsf hgfdh gnsfbdg rsthsryn s sdfg snhyrtsh sfg" votes={3} votesGoal={11}/>
          <VotingRow name="Basketball tomorrow?" description="regrehgsf hgfdh gnsfbdg rsthsryn s sdfg snhyrtsh sfg" votes={3} votesGoal={11}/>
          <VotingRow name="Basketball tomorrow?" description="regrehgsf hgfdh gnsfbdg rsthsryn s sdfg snhyrtsh sfg" votes={3} votesGoal={11}/>
      </div>
  </div>
  )
}
export default Activity;

