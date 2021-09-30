import './App.css'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
// import { auth } from './firebase.js'
import Home from './Components/Home'
import Login from './Components/Login'
import { auth, provider } from './firebase'
import { addUserInfo } from './store/Reducers/User'
import { useDispatch } from 'react-redux'

function App() {
  const [isLogado, setIsLogado] = useState(false)
  const [user, setUser] = useState({ nome: null, tel: null, foto: null })
  const dispatch = useDispatch()
  console.log('User do app')
  console.log(user)
  console.log(isLogado)

  const logaGoogle = async () => {
    await auth
      .signInWithPopup(provider)
      .then(result => {
        // The signed-in user info.
        let user = result.user

        if (user) {
          setIsLogado(true)
          setUser({
            nome: user.displayName,
            tel: user.phoneNumber,
            foto: user.photoURL
          })
          dispatch(addUserInfo(user))
        }
        // return {
        //   nome: user.displayName,
        //   tel: user.phoneNumber,
        //   foto: user.photoURL
        // }

        // ...
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

  // dispatch(addUserInfo('Artur Alexandre'))
  // function Home() {
  //   useEffect(() => {
  //     if (cartLength === 0) {
  //       document.querySelector('.notify').style.display = 'none'
  //     } else if (cartLength > 0) {
  //       document.querySelector('.notify').style.display = 'flex'
  //     }
  //   }, [cartLength])
  //   return (
  //     <>
  //       <Header User={user} />
  //       <Link to="/Cart">
  //         <div className="cart-icon">
  //           <div className="notify">
  //             <p>{cartLength}</p>
  //           </div>
  //           <FaShoppingCart fontSize="1.8rem" />
  //         </div>
  //       </Link>
  //       <PromotionCard />
  //       <ProductData />
  //       <button onClick={() => logOut()}>Sair</button>
  //     </>
  //   )
  // }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          {isLogado ? <Home User={user} /> : <Login logaGoogle={logaGoogle} />}
        </Switch>
      </div>
    </Router>
  )
}

export default App
