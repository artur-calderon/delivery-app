import React, { useEffect, useState } from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { HeaderUserInfo } from '../styles/styles'
import firebase from 'firebase'

export default function Header({ User }) {
  const user = useSelector(state => state.user)
  // const [userAuth, setUserAuth] = useState({
  //   displayName: null,
  //   photoURL: null
  // })

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
        {User != null ? (
          <>
            <h5>
              Bem-Vindo, <br /> {User.displayName}
            </h5>
            <img
              style={{
                width: '2rem',
                heigth: '2rem',
                borderRadius: '1rem'
              }}
              src={User.photoURL}
              alt={User.displayName}
            />
          </>
        ) : null}
      </HeaderUserInfo>
    </div>
  )
}
