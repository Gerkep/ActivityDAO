import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";




import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import "../style/createActivity.css"
import "../style/proposeTimePlace.css"
import { publishToIPFS } from "../utils/core";


const ProposeTimePlace = (props) => {
    const navigate = useNavigate();

  const [newDAOName, setNewDAOName] = useState('');
    // const [value, setValue] = React.useState<Date | null>(new Date());
    const [value, setValue] = useState(new Date())




  const [transaction, setTransaction] = useState(null);
  useEffect(()=> {
      if(transaction){
        //   console.log("hash: ", transaction.hash);
        //   let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
        //     navigate(`/activity/${data}`);
        //   });
        navigate(`/activity/${transaction}`);
      }
      else{
          console.log("error");
      }
  }, [transaction])


  const {account , library} = useWeb3React();
  console.log("MetaMask Info",account, library);

  console.log("Cur Name: ",newDAOName);

  console.log("Datetime: ", Math.floor(value.getTime() / 1000));



  return (

    <div>
        <Link to="/" className="main-page-link">MAIN PAGE</Link>

        
        <h1 className="header-name-pTP">Propose a Time and Place for Your Activity</h1>
        <div className="centered">
        
        
        <label className="act-name">Propose Place</label>
        <textarea className="item" onChange={e => setNewDAOName(e.target.value)} />    
        
        <label className="act-name">Propose Date and Time</label>


        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                setValue(newValue);
                }}
            />
        </LocalizationProvider>

        
        {/* <button
        onClick={async () => {
            //let tx = await withConfirmation(performTx(library,account, '0x30f38906eFa003244bE583e49E362f57130FA056',account,'deployDAO',[newDAOName]));
            let tx = 1;  
            console.log("TX: ", tx);
            setTransaction(tx);
            
        }}
        className="connect-btn-crAc"
        >
        Perform tx
        </button> */}
        </div>

    </div>

  

 
  );
};


export default ProposeTimePlace;
