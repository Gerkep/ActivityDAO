import React from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { useState } from "react";
import MainPage from "./components/MainPage.js";
import { VaultFactoryAddress } from "./constants/Addresses.js";
class App extends React.Component {
    render(){
        return(
            <div>
                Welcome to SmartDAO
                <MainPage/>
            </div>
            
        )
    
    }
}

export default App;