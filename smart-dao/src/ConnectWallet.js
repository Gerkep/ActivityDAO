import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { isNoEthereumObject } from "./lib/errors";
import {Link} from 'react-router-dom'

import history from "./history.js";
import "./styles.css";

export default function ConnectWallet() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

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
    history.push('/daoDashboard')
  };

  return (
    <div>
      <div className="connect">
        <Link to="/daoDashboard" type="button" onClick={handleConnect} className="connect-btn">
          {active ? "Disconnect" : "Connect"}
        </Link>
      </div>
    </div>
  );
}
