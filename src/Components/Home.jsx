import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import PromotionCard from './PromotionCard'
import ProductData from './ProductData'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { removeUserInfo } from '../store/Reducers/User'

export default function Home({ User }) {
  const cartLength = useSelector(state => state.cart.length)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  console.log('user do da store')
  console.log(user)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // setPUser({
        //   nome: user.displayName,
        //   tel: user.phoneNumber,
        //   foto: user.photoURL
        // })
        // setIsLogado(true)
      }
    })
  }, [user])
  useEffect(() => {
    if (cartLength === 0) {
      document.querySelector('.notify').style.display = 'none'
    } else if (cartLength > 0) {
      document.querySelector('.notify').style.display = 'flex'
    }
  }, [cartLength])

  function logOut() {
    dispatch(removeUserInfo(user))
    auth
      .signOut()
      .then(() => {
        alert('Deslogado')

        window.location.href = '/'
      })
      .catch(er => {
        alert(er)
      })
  }
  return (
    <>
      <Header User={User} />

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
      <button onClick={() => logOut()}>Sair</button>
    </>
  )
}
