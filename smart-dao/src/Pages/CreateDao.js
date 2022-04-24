import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

import ACTIVITY_HALL_ABI from "../constants/abis/ActivitesHall.json";


import "../style/createActivity.css"
import { publishToIPFS } from "../utils/core";


import { OurToken, ActivitesHall } from "../constants/Addresses";


const CreateDAO = (props) => {
    let navigate = useNavigate();

  const [newDAOName, setNewDAOName] = useState('');
  const [minNumParticipants, setMinNumParticipants] = useState('');


  const [transaction, setTransaction] = useState(null);
  useEffect(()=> {
      if(transaction){
          console.log("hash: ", transaction.hash);
          let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
            navigate(`/activity/${data}`);
          });
        // navigate(`/activity/${transaction}`);
      }
      else{
          console.log("errorCreateDao");
      }
  }, [transaction])


  const {account , library, chainId} = useWeb3React();
  console.log("MetaMask Info",account, library);

  console.log("Cur Name: ",newDAOName);


  const fields = [
      {
          name : 'Activity Name',
          element : newDAOName,
          setter : setNewDAOName
      },
      {
          name : 'Min Number of Participants',
          element : minNumParticipants,
          setter : setMinNumParticipants
      }
  ]

  return (

    <div>
        <h1 className="header-name">Complete Activity Form</h1>
        <div className="centered">
        {/* {
        fields.map(item =>{ */}
            {/* return ( */}
                <div>
                    <label className="act-name">Activity Name</label>
                    <textarea className="item" onChange={e => setNewDAOName(e.target.value)} />    
                </div>
                <div>
                    <label className="act-name">Min Number of Participants</label>
                    <textarea className="item" onChange={e => setMinNumParticipants(e.target.value)} />    
                </div>
        {/* )})
        } */}
        <button
        onClick={async () => {
            console.log("parsing ", parseInt(minNumParticipants));
            let tx = await withConfirmation(performTx(library,ACTIVITY_HALL_ABI ,account, ActivitesHall[chainId],account,'deployActivity',[newDAOName,parseInt(minNumParticipants),1000000,OurToken[chainId],60]));
            // let tx = 1;  
            console.log("TX: ", tx);
            setTransaction(tx);
            
        }}
        className="connect-btn-crAc"
        >
        Perform tx
        </button>
        </div>

    </div>

  

 
  );
};


export default CreateDAO;
