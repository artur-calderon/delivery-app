import './App.css'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
// import { auth } from './firebase.js'
import Home from './Components/Home'
import Login from './Components/Login'
// import { auth, provider } from './firebase'
import { GoogleLogout } from 'react-google-login'
import { addUserInfo, removeUserInfo } from './store/Reducers/User'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  // const [userAuth, setUserAuth] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log('User do app')
  console.log(user)

  const LogOut = res => {
    dispatch(removeUserInfo(user))
  }
  const handleLogin = data => {
    console.log(data.profileObj)

    dispatch(addUserInfo(data.profileObj))
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          {user.length === 0 ? (
            <>
              <Login logaGoogle={handleLogin} />
            </>
          ) : (
            <Home desloga={LogOut} />
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
