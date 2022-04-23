   
import React from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import ConnectWallet from './ConnectWallet.js'

import WelcomePage from './Pages/WelcomePage.js'
import DaoDashboard from './Pages/DaoDashboard.js'

import { Route, Routes, Link } from 'react-router-dom';

class App extends React.Component {

    render(){
        return(
            <Routes>
                <Route exact path='/' element={<WelcomePage/>} />
                <Route exact path='/daoDashboard' element={<DaoDashboard/>} />
            </Routes>
        )
    
    }
}

export default App;