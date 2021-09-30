import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { HeaderUserInfo } from '../styles/styles'

export default function Header({ User }) {
  const user = useSelector(state => state.user)
  console.log('user o header  ')
  console.log(user)
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
      {user.map(user => {
        return (
          <HeaderUserInfo>
            <h5>
              Bem-Vindo, <br /> {user.displayName}{' '}
            </h5>
            <img
              style={{ width: '2rem', heigth: '2rem', borderRadius: '1rem' }}
              src={user.photoURL}
              alt={user.displayName}
            />
          </HeaderUserInfo>
        )
      })}
    </div>
  )
}
