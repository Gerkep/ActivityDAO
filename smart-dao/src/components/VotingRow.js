import React from "react";
import "../style/votingRow.css"

class VotingRow extends React.Component {


    render(){
        return(
            <div className="voting-row">
                <div className="voting-about">
                    <h2 className="voting-name">Voting name</h2>
                    <p className="voting-description">dsagfjkha dsfa sjang weuhf waeuhris udsf buew uwi rawegfhpreagf iearg iraegiyar hwejkfaoe fbwf goy 4kfa</p>
                </div>
                <div className="voting-interact">
                    <button className="approve-voting-btn">Approve</button>
                    <p className="votes-counter">23/45</p>
                </div>
            </div>
        )
    
    }
}

export default VotingRow;