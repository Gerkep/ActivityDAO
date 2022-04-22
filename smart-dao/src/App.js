import React from "react";

import ConnectWallet from './ConnectWallet.js'
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