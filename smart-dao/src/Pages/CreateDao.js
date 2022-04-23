import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import { performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';



const CreateDAO = (props) => {
    const navigate = useNavigate();

  const [newDAOName, setNewDAOName] = useState('');
  const [transaction, setTransaction] = useState(null);
  useEffect(()=> {
      if(transaction){
          //redirect to dashboard and pass parameter which is transaction hash
          //which is transaction.hash
          //set transaction to null
          //programmatically reedirect user to a url
          //{transactionHash : transaction.hash} 
          navigate('/daoDashboard');
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
          name : 'name',
          element : newDAOName,
          setter : setNewDAOName
      }
  ]

  return (
    
    <div>

      {
          fields.map(item =>{
              return (
              <div><label>{item.name}</label>
                <textarea  onChange={e => setNewDAOName(e.target.value)} />
                
            </div>
            //   <div onChange={()=>{setNewDAOName()}}>asass</div></div> )
          )})
      }
      <button
        onClick={async () => {
          //let tx = await withConfirmation(performTx(library,account, '0x30f38906eFa003244bE583e49E362f57130FA056',account,'deployDAO',[newDAOName]));
          let tx = 1;  
          console.log("TX: ", tx);
            setTransaction(tx);
            
        }}
      >
        Perform tx
      </button>
    </div>
  );
};


export default CreateDAO;
