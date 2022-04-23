import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "./lib/connectors";
import { isNoEthereumObject } from "./lib/errors";

import "./styles.css";

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
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });
  };

  return (
    <div>
      <div className="user">
        <p>Account: {account}</p>
        <p>ChainId: {chainId}</p>
      </div>
      <div className="connect">
        <button type="button" onClick={handleConnect}>
          {active ? "disconnect" : "connect"}
        </button>
      </div>
    </div>
  );
}

export default ConnectWallet;
