import React from "react";
import "../style/votingRow.css"
import { Link } from "react-router-dom";
class ActivityRowForWelcome extends React.Component {


    render(){
        return(
            <div className="voting-row">
                <div className="voting-about">
                    <h2 className="voting-name">{this.props.name}</h2>
                    <p className="voting-description">{this.props.description}</p>
                </div>
                <div className="voting-interact">
                    {/* <Link to={`/activity/${this.props.hash}`} className="join-activity-btn">Join</Link> */}
                </div>
            </div>
        )
    
    }
}

export default ActivityRowForWelcome;