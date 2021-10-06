import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import PromotionCard from './PromotionCard'
import ProductData from './ProductData'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import firebase from 'firebase'

export default function Home({ desloga }) {
  const cartLength = useSelector(state => state.cart.length)

  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    if (cartLength === 0) {
      document.querySelector('.notify').style.display = 'none'
    } else if (cartLength > 0) {
      document.querySelector('.notify').style.display = 'flex'
    }
  }, [cartLength])

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      setUserAuth(user)
    })
  })
  return (
    <>
      <Header User={userAuth} />

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

      <button onClick={() => desloga()}>Sair</button>
    </>
  )
}
