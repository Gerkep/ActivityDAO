import React, { useEffect, useState }  from 'react';
// import "../style/checkinPage.css"
import "../style/propTimePlace.css"

import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { getComunnityFromTx, performTx, withConfirmation } from "../utils/core";
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import "../style/createActivity.css"
import { ethers } from 'ethers';
import ACTIVITY_ABI from "../constants/abis/Activity.json";


const ProposeTimePlace1 = () => {

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
    const [value3, setValue3] = useState(new Date());


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send("eth_requestAccounts", []);
    // const signer = provider.getSigner()
    // const activityContract = new ethers.Contract("0x79cF3c6F91123c72b986921030F429CA8c8ac437", ACTIVITY_ABI, provider);

    const [value, setValue] = useState(new Date());
    const {id} = useParams();


    
    const [transaction, setTransaction] = useState(null);

    const navigate = useNavigate();
    const [newDAOName, setNewDAOName] = useState('');

    useEffect(()=> {
        if(transaction){
            //console.log("hash: ", transaction.hash);
            // let myCommunityAddr = getComunnityFromTx(transaction.hash, library).then((data)=>{
            //   navigate(`/activity/${data}`);
            // });
          navigate(`/activity/${id}`);
        }
        else{
            console.log("error");
        }
    }, [transaction])

    const {account , library} = useWeb3React();
    console.log("MetaMask Info",account, library);
  
    console.log("Cur Name: ",newDAOName);

  
    console.log("Datetime1: ", Math.floor(value1.getTime() / 1000));
    console.log("Datetime2: ", Math.floor(value2.getTime() / 1000));
    console.log("Datetime3: ", Math.floor(value3.getTime() / 1000));




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
                            value={value1}
                            onChange={(newValue) => {
                            setValue1(newValue);
                            }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={value2}
                            onChange={(newValue) => {
                            setValue2(newValue);
                            }}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={value3}
                            onChange={(newValue) => {
                            setValue3(newValue);
                            }}
                            />
                        </LocalizationProvider>
                </div>  
                

                <button
                    onClick={async () => {
                        let valArr = [[Math.floor(value1.getTime() / 1000)],[Math.floor(value2.getTime() / 1000)],[Math.floor(value3.getTime() / 1000)]]
                        let tx = await withConfirmation(performTx(library,ACTIVITY_ABI,account, id,account,'proposeLocation',[newDAOName,valArr]));
                        //let tx = 1;  
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