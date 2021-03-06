import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

// import * as firebase from 'firebase'
import { db, onAuthStateChanged, auth, query, where } from '../firebase'

import ProductData from './ProductData'
import PromotionCard from './PromotionCard'
import Header from './Header'
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore'

export default function Home() {
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
    onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })

    if (userAuth) {
      console.log(userAuth)

      const q = query(
        collection(db, 'clientes'),
        where('id', '==', userAuth.uid)
      )
      onSnapshot(q, res => {
        if (res.empty) {
          setDoc(doc(db, 'clientes', userAuth.displayName.replace(/ /g, '')), {
            id: userAuth.uid,
            nome: userAuth.displayName,
            email: userAuth.email,
            telefone: userAuth.phoneNumber,
            endereco: null
          })
            .then(() => {
              console.log('Cadastrado!')
            })
            .catch(err => {
              console.log(err)
            })
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
    </>
  )
}
