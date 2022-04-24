import React,{useState,useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import VotingRow from "../components/VotingRow";
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import "../style/daoDashboard.css"
import { Proposals} from "../constants/SampleData";
import { getProposals } from "../utils/core";
const Activity = () => {

  const {library, account, chainId} = useWeb3React();
  const [myList, setMyList] = useState(null);
  // getTopActivities(library,chainId,10).then((data)=>{
  //   setMyList(data)
  // });
  const {id} = useParams();
  useEffect(() => {
    const intervalId = setInterval(() => {
      getProposals(library,chainId,null,id).then((list)=>{
        setMyList(list);
      });
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, []);
  const navigate = useNavigate();

  const renderProposals = () => {
    if(myList) {
      return myList.map(item => {
        return (
          <VotingRow location={item.location} proposer={item.proposer} timeOptions={item.times} remainingTime={item.deadline}> </VotingRow>
        )
    })
    }else{
      return (
        <label>Loading Proposals ...</label>
      )
    }
    
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

