import React , {useEffect, useState}from "react";
import { Link } from "react-router-dom";
import ActivityRow from "../components/ActivityRow";
import { Activities } from "../constants/SampleActivities";
import { useWeb3React } from "@web3-react/core";
import { getTopActivities } from "../utils/core";
import "../style/daoDashboard.css"
const ActivitiesList = () => {

  const {library, account, chainId} = useWeb3React();
  const [myList, setMyList] = useState(null);
  // getTopActivities(library,chainId,10).then((data)=>{
  //   setMyList(data)
  // });

  useEffect(() => {
    const intervalId = setInterval(() => {
      getTopActivities(library,chainId,null).then((list)=>{
        setMyList(list);
      });
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, []);

  const generateActivitiesList = () => {
    if(myList) {
      return myList.map(activity => {
        return (
            <ActivityRow key={activity.hash} name={activity.name} description={activity.deadline} hash={activity.hash} />
        )
    })
    }else{
      return (
        <label>Loading Activities ...</label>
      )
    }
    
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

