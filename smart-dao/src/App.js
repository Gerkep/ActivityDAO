   
import React from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
// import ConnectWallet from './ConnectWallet.js'

import WelcomePage from './Pages/WelcomePage.js'
import Activity from './Pages/Activity.js'
import OptionPage from './Pages/OptionPage'
import CreateDAO from "./Pages/CreateDao.js";

import { Route, Routes, Link } from 'react-router-dom';
import ActivitiesList from "./Pages/ActivitiesList.js";

class App extends React.Component {
    render(){
        return(
            <Routes>
                <Route exact path='/' element={<WelcomePage/>} />
                <Route exact path='/option' element={<OptionPage/>} />
                <Route path='/activity/:id' element={<Activity/>} />
                <Route exact path='/CreateDao' element={<CreateDAO/>} />
                <Route exact path='/activities' element={<ActivitiesList/>} />
            </Routes>
        )
    
    }
}

export default App;