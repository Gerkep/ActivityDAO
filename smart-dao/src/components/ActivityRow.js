import React from "react";
import "../style/votingRow.css"

class ActivityRow extends React.Component {


    render(){
        return(
            <div className="voting-row">
                <div className="voting-about">
                    <h2 className="voting-name">{this.props.name}</h2>
                    <p className="voting-description">{this.props.description}</p>
                </div>
                <div className="voting-interact">
                    <button className="join-activity-btn">Join</button>
                </div>
            </div>
        )
    
    }
}

export default ActivityRow;