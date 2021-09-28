import Header from './Components/Header'
import './App.css'
import PromotionCard from './Components/PromotionCard'
import ProductData from './Components/ProductData'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { auth, provider } from './firebase.js'

function App() {
  const cartLength = useSelector(state => state.cart.length)
  const [user, setUser] = useState('')

  useEffect(() => {
    if (cartLength === 0) {
      document.querySelector('.notify').style.display = 'none'
    } else if (cartLength > 0) {
      document.querySelector('.notify').style.display = 'flex'
    }
  }, [cartLength])

  function Home() {
    const logaGoogle = () => {
      auth
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // The signed-in user info.
          const user = result.user
          console.log(user.displayName)
          setUser({
            nome: user.displayName,
            phone: user.phoneNumber,
            photo: user.photoURL
          })

          // ...
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
          // The email of the user's account used.
          const email = error.email
          console.log(email)
          // The AuthCredential type that was used.
          // ...
        })
    }
    console.log(user)
    return (
      <>
        <PromotionCard />
        <ProductData />

        <button onClick={logaGoogle}>Logar Google</button>
      </>
    )
  }
  return (
    <Router>
      <div className="App">
        <Header User={user} />
        <Link to="/Cart">
          <div className="cart-icon">
            <div className="notify">
              <p>{cartLength}</p>
            </div>

            <FaShoppingCart fontSize="1.8rem" />
          </div>
        </Link>
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
