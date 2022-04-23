import React from 'react';
import "../style/checkinPage.css"
import { Link, useParams } from 'react-router-dom';

const Checkin = () => {
    const {id} = useParams();
        return(
            <div className='checkin-page'>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                <Link to={`/activity/${id}`} className='close-btn'>X</Link>
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