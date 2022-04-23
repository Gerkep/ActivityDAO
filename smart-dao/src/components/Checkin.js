import React from 'react';
import "../style/checkinPage.css"
import { Link } from 'react-router-dom';

const Checkin = () => {
        return(
            <div className='checkin-page'>
                      <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                    <h1 className='checkin-header'>Check in Participant Address</h1>
                    <div className='checkin-input'>
                        <input placeholder='address' type="text" className='address-input'/>
                        <input type="checkbox" className='checkin-checkbox'/>
                    </div>
                </div>
            </div>
        );
}

export default Checkin;