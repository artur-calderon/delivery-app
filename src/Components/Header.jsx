import React from 'react'
import './Header.css'

import { signOut, auth } from '../firebase'

import { HeaderUserInfo } from '../styles/styles'

export default function Header({ User }) {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('Deslogado')
        window.location.href = '/';
      })
      .catch(error => {
        // An error happened.
      })
  }

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
            <button onClick={() => logOut()}>Sair</button>
          </>
        ) : null}
      </HeaderUserInfo>
    </div>
  )
}
