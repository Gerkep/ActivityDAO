   
import React from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
// import ConnectWallet from './ConnectWallet.js'

import WelcomePage from './Pages/WelcomePage.js'
import Activity from './Pages/Activity.js'
import OptionPage from './Pages/OptionPage'
import CreateDAO from "./Pages/CreateDao.js";
import Checkin from "./components/Checkin.js";

import { Route, Routes} from 'react-router-dom';
import ActivitiesList from "./Pages/ActivitiesList.js";

class App extends React.Component {
    render(){
        return(
            <div>
            <Routes>
                <Route exact path='/' element={<WelcomePage/>} />
                <Route exact path='/option' element={<OptionPage/>} />
                <Route exact path='/activity/:id' element={<Activity/>} />
                <Route path="/checkin" exact element={<Checkin/>} />
                <Route exact path='/CreateDao' element={<CreateDAO/>} />
                <Route exact path='/activities' element={<ActivitiesList/>} />
            </Routes>
            </div>
        )
    
    }
}

export default App;