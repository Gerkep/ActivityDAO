import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import ActivityRowForWelcome from "../components/ActivityRowForWelcome";
import { Activities } from "../constants/SampleActivities";
import { useWeb3React } from "@web3-react/core";

import "../style/daoDashboard.css"
import { getTopActivities } from "../utils/core";
const ActivitiesListforWelcome = (props) => {

  const {library, account, chainId} = useWeb3React();
  const [myList, setMyList] = useState([]);
  // getTopActivities(library,chainId,10).then((data)=>{
  //   setMyList(data)
  // });

  useEffect(() => {
    const intervalId = setInterval(() => {
      getTopActivities(library,chainId,3).then((list)=>{
        setMyList(list);
      });
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, []);

  const generateActivitiesList = () => {
    if(myList) {
      return myList.map(activity => {
        return (
            <ActivityRowForWelcome key={activity.hash} name={activity.name} description={activity.deadline} hash={activity.hash} />
        )
    })
    }
    
  }


  return (
    <div>
      <Link to="/" className="main-page-link">MAIN PAGE</Link>
      <h1 className="page-name-for-welc">Some Activities Coming Up ...</h1>
      <div className="votings-container-for-welc">
          {generateActivitiesList()}
      </div>
  </div>
  )
}
export default ActivitiesListforWelcome;

