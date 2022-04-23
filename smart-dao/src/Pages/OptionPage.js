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
            <Link to="/daoDashboard" type="button" onClick={handleJoin} className='connect-btn button'>Join DAO</Link>
            <Link to="/CreateDao" type="button" onClick={handleCreate} className='connect-btn button'>Create DAO</Link>      
        </div>

    );
  }

export default OptionPage

