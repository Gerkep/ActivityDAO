import React from "react";
import "../style/votingRow.css"

class VotingRow extends React.Component {


    render(){
        return(
            <div className="voting-row">
                <div className="voting-about">
                    <h2 className="voting-name">{this.props.name}</h2>
                    <p className="voting-description">{this.props.description}</p>
                </div>
                <div className="voting-interact">
                    <button className="approve-voting-btn">Approve</button>
                    <p className="votes-counter">{this.props.votes}/{this.props.votesGoal}</p>
                </div>
            </div>
        )
    
    }
}

export default VotingRow;