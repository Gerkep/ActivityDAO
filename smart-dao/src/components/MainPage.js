import React, { useEffect, useState } from "react";
import ConnectWallet from "../ConnectWallet";
import { performTx } from "../utils/core";

const MainPage = (props) => {
  const [account, setAccount] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [newDAOName, setNewDAOName] = useState('');

  const fields = [
      {
          name : 'name',
          element : newDAOName,
          setter : setNewDAOName
      }
  ]

  useEffect(()=>{
    console.log(account, library);
  },[account, library])
  return (
    <div>
      <ConnectWallet 
      setLibrary = {setLibrary}
      setAccount = {setAccount}/>
      {
          fields.map(item =>{
              return (
              <div><label>{item.name}</label>
              <div onChange={()=>{setNewDAOName()}}>asass</div></div> )
          })
      }
      <button
        onClick={async () => {
          await performTx(library,account, '0x7fCA0CbB525917C6fC0548676BFFC02A7c1f508B',account,'name',[""]);
        }}
      >
        Perform tx
      </button>
    </div>
  );
};

export default MainPage;
