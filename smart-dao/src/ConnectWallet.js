import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "./lib/connectors";
import { isNoEthereumObject } from "./lib/errors";
import { Link } from "react-router-dom";
import "./style/styles.css";

import ActivityListforWelcome from './components/ActivityListforWelcome.js'


const ConnectWallet = (props) => {
  const { chainId, library, account, active, activate, deactivate } = useWeb3React();
  const {setLibrary, setAccount} = props;

  useEffect(()=>{
    setAccount(account);
  },[account])
  useEffect(()=>{
    setLibrary(library)
  },[library])

  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }
    activate(injected, (error) => {
      if (isNoEthereumObject(error)){
        window.open("https://metamask.io/download.html");
      }
    });
  };

  return (
    <div>
      
        
      <ActivityListforWelcome activity={active}/>

      

      <div className="connect">
        <Link to="/option" type="button" onClick={handleConnect} className="connect-btn button">
          {active ? "Disconnect" : "Connect"}
        </Link>
      </div>
    </div>
  );
}

export default ConnectWallet;
