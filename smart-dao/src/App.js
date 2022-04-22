<<<<<<< HEAD
import React from "react";import { Web3ReactProvider, useWeb3React } from "@web3-react/core";

=======
import React from "react";

import ConnectWallet from './ConnectWallet.js'
>>>>>>> 89d7bdc8ebaf84c9e8a9447d77c5ea48f6809864
class App extends React.Component {

    render(){
        return(
            <div>
                Welcome to SmartDAO
                <ConnectWallet/>
            </div>
        )
    
    }
}

export default App;