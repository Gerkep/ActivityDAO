import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { isNoEthereumObject } from "./lib/errors";

import "./styles.css";

export default function ConnectWallet() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

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
