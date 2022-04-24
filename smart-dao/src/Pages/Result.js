import React from 'react';
import "../style/checkinPage.css"
import "../style/result.css"
import { Link, useParams } from 'react-router-dom';

const Checkin = () => {
    const {id} = useParams();
    const conensusReached = true;

        return(
            <div className='checkin-page'>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <div className='checkin'>
                <Link to={`/activity/${id}`} className='close-btn'>X</Link>
                <h1 className='checkin-header'>Results Are Here!</h1>
                <div className='checkin-input'>
                    {conensusReached ? <h2 className='result-message'>Reached</h2> : <h2 className='result-message'>Not Reached</h2>}
                    <button className='stake-claim-btn'>Claim Unused Stake</button>
                </div>
                
                </div>
            </div>
        );
}

export default Checkin;