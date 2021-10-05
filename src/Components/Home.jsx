import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import PromotionCard from './PromotionCard'
import ProductData from './ProductData'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { GoogleLogout } from 'react-google-login'
// import { removeUserInfo } from '../store/Reducers/User'

export default function Home({ desloga }) {
  const cartLength = useSelector(state => state.cart.length)
  // const [userAuth, setUserAuth] = useState({
  //   displayName: null,
  //   photoURL: null
  // })
  const user = useSelector(state => state.user)
  // const dispatch = useDispatch()

  console.log('user do da store')
  console.log(user)

  useEffect(() => {
    if (cartLength === 0) {
      document.querySelector('.notify').style.display = 'none'
    } else if (cartLength > 0) {
      document.querySelector('.notify').style.display = 'flex'
    }
  }, [cartLength])

  return (
    <>
      <Header />

      <Link to="/Cart">
        <div className="cart-icon">
          <div className="notify">
            <p>{cartLength}</p>
          </div>
          <FaShoppingCart fontSize="1.8rem" />
        </div>
      </Link>
      <PromotionCard />
      <ProductData />
      <GoogleLogout
        clientId="558850311827-r92555jdbc3jvhq0f0oult7hnaide6e0.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={desloga}
      ></GoogleLogout>
      {/* <button onClick={() => desloga()}>Sair</button> */}
    </>
  )
}
