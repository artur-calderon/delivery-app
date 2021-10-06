import './App.css'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Home from './Components/Home'
import firebase from 'firebase'
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

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

function App() {
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged(user => {
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
          {userAuth === null ? (
            <>
              <StyleFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </>
          ) : (
            <Home desloga={logOut} />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
