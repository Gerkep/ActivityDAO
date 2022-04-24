import React, { useEffect, useState } from "react";
import "../style/styles.css";
import "../style/optionPage.css";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { createRandomAvatar } from "../utils/core";
import { getUserData } from "../utils/core";
import "../style/optionPage.css";
import { editUserInfo } from "../utils/core";

function OptionPage() {
  const { account, library, chainId } = useWeb3React();
  const [userProfile, setUserProfile] = useState(null);
  const [newUserName, setNewUserName] = useState();
  const [newUserPic, setNewUserPic] = useState();
  const [imageToUpload, setImageToUpload] = useState(null);

  if (library) {
    getUserData(library, account, chainId).then((data) => {
      setUserProfile(data);
    });
  }

  function handleJoin(e) {
    console.log("You clicked join.");
  }

  function handleCreate(e) {
    console.log("You clicked create.");
  }

  return (
    <div className="mainContainer">
      {userProfile && userProfile.name ? (
        <div className="infoBox">
          <div className="page-name-opt1">Welcome Back {userProfile.name}!</div>
          <img className="profilePic" src={userProfile.url}></img>

        </div>
      ) : (
        <div className="infoBox">
          <div className="page-name-opt2">Become a Member of the Community!</div>
          <div className="formContainer">
            <label className="act-name">Name</label>
            <textarea
              className="item"
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
  
          <input className="file-opt" type="file" name="myImage" onChange={(e)=>{setImageToUpload(e.target.files[0])}} />

          <div>
            <button
              onClick={async () => {
                await editUserInfo(library, account, chainId, newUserName, imageToUpload);
              }}
            className="registerButton">
              register
            </button>
          </div>
        </div>
      )}
      <div className="buttonContainer">
        <Link
          to="/activities"
          type="button"
          onClick={handleJoin}
          className="option-btn"
        >
          Join Activity
        </Link>
        <Link
          to="/CreateDao"
          type="button"
          onClick={handleCreate}
          className="option-btn"
        >
          Create Activity
        </Link>
      </div>
    </div>
  );
}

export default OptionPage;
