import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  signOut,
  onAuthStateChanged,
  auth,
  provider,
  signInWithPopup
} from './firebase'

import './App.css'
import styled from 'styled-components'

import Home from './Components/Home'
import Cart from './Components/Cart'
import StatusPedido from './Components/StatusPedido'

// let ui = new firebaseui.auth.AuthUI(auth)
// ui.start(Login, {
//   signInFlow: 'redirect',
//   signInOptions: [
//     auth.EmailAuthProvider.PROVIDER_ID,
//     auth.GoogleAuthProvider.PROVIDER_ID,
//     auth.FacebookAuthProvider.PROVIDER_ID
//   ],
//   callbacks: {
//     signInSucessWithAuthResult: user => {
//       console.log(user)
//     }
//   }
// })
function Logar() {
  signInWithPopup(auth, provider)
    .then(result => {})
    .catch(error => {
      console.log(error)
    })
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
const ButtonLogin = styled.button`
  margin-top: 1rem;
  border: 0;
  width: 90%;
  height: 3rem;
  padding: 1rem;
  text-align: center;
`

function App() {
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })
  })

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('Deslogado')
        setUserAuth(null)
      })
      .catch(error => {
        // An error happened.
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
              <ButtonLogin onClick={Logar}>Logar com google</ButtonLogin>
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
