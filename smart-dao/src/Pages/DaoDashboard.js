import React from "react";
import { ethers } from "ethers";
class DaoDashboard extends React.Component {
  componentDidMount(){
    this.connectCantract();
  }

  async connectCantract () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    // const contract = new ethers.Contract("0x79cF3c6F91123c72b986921030F429CA8c8ac437", abi, provider);
  }

    render(){
        return(
            <div>
                DAODashboard
            </div>
        )
    
    }
}

export default DaoDashboard;