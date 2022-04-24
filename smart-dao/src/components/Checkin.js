import React from 'react';
import "../style/checkinPage.css"
import { Link, useParams } from 'react-router-dom';
import { FakeAddresses } from '../constants/FakeAddresses';

const Checkin = () => {
    const generateAddresses = () => {
          return FakeAddresses.map(address => {
            return (
                <div className='checkin-input'>
                    <p className='address-input'>{address.address}</p>
                    <input type="checkbox" className='checkin-checkbox'/>
                </div>
            )
        })
        
    }

    const {id} = useParams();
        return(
            <div className='checkin-page'>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                <Link to={`/activity/${id}`} className='close-btn'>X</Link>
                <h1 className='checkin-header'>Check in Participant Address</h1>
                <div className='addresses-list'>
                    {generateAddresses()}
                </div>
                <button className='stake-claim-btn'>Check-in</button>
                <button className='stake-claim-btn'>Claim staking</button>

                </div>
            </div>
        );
}

export default Checkin;