import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from 'firebase'
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import './App.css'
import styled from 'styled-components'

import Home from './Components/Home'
import Cart from './Components/Cart'
import StatusPedido from './Components/StatusPedido'

let uiConfig = {
  signInFlow: 'redirect',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSucessWithAuthResult: user => {
      console.log(user)
    }
  }
}

const Login = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`
const ImgLogo = styled.img`
  width: 100%;
  height: auto;
`

function App() {
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUserAuth(user)
    })
  })

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('Deslogado')
        setUserAuth(null)
      })
      .catch(er => {
        console.log(er)
      })
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          <Route path="/status-pedido" exact component={StatusPedido} />
          {userAuth === null ? (
            <Login>
              <ImgLogo
                src="https://play-lh.googleusercontent.com/7Jm2vqYC7Pzm8M3AqwjJCFXtBL09gPVQ7HN9QSEBr3udZ0o_okVo-Fzrj309qESQWE0"
                alt="logo"
              />
              <StyleFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Login>
          ) : (
            <Home desloga={logOut} />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
