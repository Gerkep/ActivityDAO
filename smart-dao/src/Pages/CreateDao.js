import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

import "../style/createActivity.css"
 



const CreateDAO = (props) => {
    const navigate = useNavigate();

  const [newDAOName, setNewDAOName] = useState('');
  const [transaction, setTransaction] = useState(null);
  useEffect(()=> {
      if(transaction){
          console.log("hash: ", transaction.hash);
          let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
            navigate(`/daoDashboard/${data}`);
          });
      }
      else{
          console.log("error");
      }
  }, [transaction])


  const {account , library} = useWeb3React();
  console.log("MetaMask Info",account, library);

  console.log("Cur Name: ",newDAOName);


  const fields = [
      {
          name : 'Activity Name',
          element : newDAOName,
          setter : setNewDAOName
      }
  ]

  return (

    <div>
        <h1 className="header-name">Complete Activity Form</h1>
        <div className="centered">
        {
        fields.map(item =>{
            return (
                <div>
                    <label className="act-name">{item.name}</label>
                    <textarea className="item" onChange={e => setNewDAOName(e.target.value)} />    
                </div>
        )})
        }
        <button
        onClick={async () => {
            let tx = await withConfirmation(performTx(library,account, '0x30f38906eFa003244bE583e49E362f57130FA056',account,'deployDAO',[newDAOName]));
            //let tx = 1;  
            console.log("TX: ", tx);
            setTransaction(tx);
            
        }}
        className="connect-btn"
        >
        Perform tx
        </button>
        </div>

    </div>

  

 
  );
};


export default CreateDAO;
