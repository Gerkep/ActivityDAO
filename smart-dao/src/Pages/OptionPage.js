import React from 'react'
import "../styles.css";

import {Link} from 'react-router-dom'

function OptionPage() {
    function handleJoin(e) {
      console.log('You clicked join.');
    }

    function handleCreate(e) {
        console.log('You clicked create.');
      }
  
    return (
        <div>
            <Link to="/daoDashboard" type="button" onClick={handleJoin}>Join DAO</Link>
            <Link to="/CreateDao" type="button" onClick={handleCreate} >Create DAO</Link>      
        </div>

    );
  }

export default OptionPage

