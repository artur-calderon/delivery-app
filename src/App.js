import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { onAuthStateChanged, auth, provider, signInWithPopup } from './firebase'

import './App.css'
import styled from 'styled-components'

import Home from './Components/Home'
import Cart from './Components/Cart'
import StatusPedido from './Components/StatusPedido'

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
  border: 1px solid orange;
  border-bottom-left-radius: 10rem;
  border-bottom-right-radius: 10rem;
`

function App() {
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })
  })

  function Logar() {
    signInWithPopup(auth, provider)
      .then(result => {})
      .catch(error => {
        console.log(error)
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

              <div className="google-btn" onClick={Logar}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google"
                  />
                </div>
                <p className="btn-text">
                  <b>Logar Com Google</b>
                </p>
              </div>
            </Login>
          ) : (
            <Home />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
