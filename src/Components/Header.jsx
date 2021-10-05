import React, { useEffect, useState } from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { HeaderUserInfo } from '../styles/styles'
import { auth } from '../firebase'

export default function Header() {
  const user = useSelector(state => state.user)
  // const [userAuth, setUserAuth] = useState({
  //   displayName: null,
  //   photoURL: null
  // })

  useEffect(() => {
    auth.onAuthStateChanged(user => {})
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
        {user.map((user, key) => {
          if (user) {
            return (
              <div key={key}>
                <h5>
                  Bem-Vindo, <br /> {user.name}
                </h5>
                <img
                  style={{
                    width: '2rem',
                    heigth: '2rem',
                    borderRadius: '1rem'
                  }}
                  src={user.imageUrl}
                  alt={user.name}
                />
              </div>
            )
          } else {
            return null
          }
        })}
      </HeaderUserInfo>
    </div>
  )
}
