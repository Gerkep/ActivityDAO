import React, { useEffect, useState }  from 'react';
// import "../style/checkinPage.css"
import "../style/propTimePlace.css"

import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import "../style/createActivity.css"

import ACTIVITY_ABI from "../constants/abis/Activity.json";
import { ethers } from 'ethers';



const ProposeTimePlace1 = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);

    
    const [value, setValue] = useState(new Date());
    const [transaction, setTransaction] = useState(null);

    const navigate = useNavigate();
    const [newDAOName, setNewDAOName] = useState('');

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


    return(
        <div className='checkin-page-PTT'>
                    <Link to="/" className="main-page-link">MAIN PAGE</Link>
            <div className='checkin-PTT'>
                <h1 className='checkin-header-PTT'>Propose a Time and Place for Your Activity</h1>
                <div className='row-PTT'>
                    <label className = 'label-PTT'>Propose Place</label>
                    <textarea className="ta-PTT" onChange={e => setNewDAOName(e.target.value)} /> 
                </div>
                <div className='row-PTT'>
                    <label className = 'label-PTT' >Propose Date and Time</label>
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
                </div>  

                <button
                    onClick={async () => {
                        //let tx = await withConfirmation(performTx(library,account, '0x30f38906eFa003244bE583e49E362f57130FA056',account,'deployDAO',[newDAOName]));
                        let tx = 1;  
                        console.log("TX: ", tx);
                        setTransaction(tx);
                    }}
                    className="connect-btn-PTT"
                    >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default ProposeTimePlace1;