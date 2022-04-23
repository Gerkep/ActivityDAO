   
import React from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import ConnectWallet from './ConnectWallet.js'

import WelcomePage from './Pages/WelcomePage.js'
import DaoDashboard from './Pages/DaoDashboard.js'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

class App extends React.Component {

    render(){
        return(
            <Router>
                <Routes>
                    <Route exact path='/' element={<WelcomePage/>} />
                    <Route exact path='/dao' element={<DaoDashboard/>} />
                </Routes>
            </Router>
        )
    
    }
}

export default App;