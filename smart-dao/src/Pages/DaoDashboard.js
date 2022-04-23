import React from "react";
import { Link } from "react-router-dom";
import VotingRow from "../components/VotingRow";

import "../style/daoDashboard.css"
class DaoDashboard extends React.Component {

  async connectCantract () {
  //   var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
  //     from: '0x1234567890123456789012345678901234567891', // default from address
  //     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  // });
  }
  renderVotings(){

}

    render(){
        return(
            <div>
                <Link to="/" className="main-page-link">MAIN PAGE</Link>
                <button className="create-idea-btn">Propose an idea</button>
                <h1 className="dao-name">Barcelona Soccer Team</h1>
                <div className="votings-container">
                    <VotingRow />
                    <VotingRow />
                    <VotingRow />
                    <VotingRow />
                </div>
            </div>
        )
    
    }
}

export default DaoDashboard;