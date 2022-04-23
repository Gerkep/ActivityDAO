import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { BrowserRouter } from "react-router-dom";


import { Web3ReactProvider } from "@web3-react/core"; //for ConnectWallet component
import { Web3Provider } from "@ethersproject/providers"; //for ConnectWallet component
import { BrowserRouter } from 'react-router-dom';

function getLibrary(provider) { ////for ConnectWallet component
    const library = new Web3Provider(provider, "any");
    return library;
  }

export default ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Web3ReactProvider>, document.querySelector("#root")
    
)

