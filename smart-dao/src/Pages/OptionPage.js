import React from 'react'
import "../style/styles.css";
import "../style/optionPage.css";

import { useWeb3React } from '@web3-react/core';
import {Link} from 'react-router-dom'

function OptionPage() {

  const {account , library} = useWeb3React();

  console.log(account, library);

    function handleJoin(e) {
      console.log('You clicked join.');
    }

    function handleCreate(e) {
        console.log('You clicked create.');
      }
  
      
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Link to="/activities" type="button" onClick={handleJoin} className='option-btn '>Join Activity</Link>
            <Link to="/CreateDao" type="button" onClick={handleCreate} className='option-btn'>Create Activity</Link>      
        </div>

    );
  }

export default OptionPage

