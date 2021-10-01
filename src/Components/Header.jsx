import React, { useEffect, useState } from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { HeaderUserInfo } from '../styles/styles'
import { auth } from '../firebase'

export default function Header() {
  // const user = useSelector(state => state.user)
  const [userAuth, setUserAuth] = useState({
    displayName: null,
    photoURL: null
  })
  console.log('user o header  ')
  console.log(userAuth)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUserAuth(user)
    })
  })
  return (
    <div className="component-Header">
      <div className="header">
        <div className="logo">
          <img
            src="https://blog.saipos.com/wp-content/uploads/2020/11/Como-usar-delivery-logo-para-meu-restaurante-SAIPOS-Sistema-Para-restaurante-12.png"
            alt=""
          />
        </div>
      </div>

      <HeaderUserInfo>
        {userAuth ? (
          <>
            <h5>
              Bem-Vindo, <br /> {userAuth.displayName}
            </h5>
            <img
              style={{ width: '2rem', heigth: '2rem', borderRadius: '1rem' }}
              src={userAuth.photoURL}
              alt={userAuth.displayName}
            />
          </>
        ) : null}
      </HeaderUserInfo>
    </div>
  )
}
