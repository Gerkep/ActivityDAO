import React from 'react'
import MainPage from '../components/MainPage.js'
import ActivityListforWelcome from '../components/ActivityListforWelcome.js'
// import ConnectWallet from '../ConnectWallet.js'



const WelcomePage = () => {
  return (
      <div>
        <div className="welcome-header">WELCOME!</div>
        {/* <ActivityListforWelcome/> */}
        <MainPage/>
    </div>
  )
}

export default WelcomePage