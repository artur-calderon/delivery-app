import './App.css'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
// import { auth } from './firebase.js'
import Home from './Components/Home'
import Login from './Components/Login'
import { auth, provider } from './firebase'
// import { addUserInfo } from './store/Reducers/User'
// import { useDispatch } from 'react-redux'

function App() {
  const [isLogado, setIsLogado] = useState(false)
  const [userAuth, setUserAuth] = useState({})
  // const dispatch = useDispatch()
  console.log('User do app')
  console.log(userAuth)

  const logaGoogle = async () => {
    await auth
      .signInWithPopup(provider)
      .then(result => {
        // The signed-in user info.
        let user = result.user

        if (user) {
          setIsLogado(true)
          setUserAuth(user)
          // dispatch(addUserInfo(user))
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
        const errorMessage = error.message
        alert(errorMessage)
        // The email of the user's account used.
        const email = error.email
        console.log(email)
        // The AuthCredential type that was used.
        // ...
      })
  }

  function logOut() {
    // dispatch(removeUserInfo(user))
    auth
      .signOut()
      .then(() => {
        alert('Deslogado')
        setUserAuth(null)
      })
      .catch(er => {
        alert(er)
      })
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          {userAuth === null ? (
            <Login logaGoogle={logaGoogle} />
          ) : (
            <Home desloga={logOut} />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
