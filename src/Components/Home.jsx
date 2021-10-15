import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import firebase from 'firebase'
import { db } from '../firebase'

import ProductData from './ProductData'
import PromotionCard from './PromotionCard'
import Header from './Header'

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
    firebase.auth().onAuthStateChanged(user => {
      setUserAuth(user)
    })

    if (userAuth) {
      let userData = {
        id: userAuth.uid,
        nome: userAuth.displayName,
        email: userAuth.email,
        telefone: userAuth.phoneNumber,
        endereco: null
      }

      const clientesRef = db.collection('clientes')
      const snapshot = clientesRef.where('id', '==', userData.id).get()

      snapshot.then(val => {
        if (val.empty) {
          console.log('Cadastra')
          db.collection('clientes').add(userData)
        } else {
          console.log('Não faz nada')
        }
      })
    }
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
