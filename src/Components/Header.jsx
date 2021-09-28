import React, { useState } from 'react'
import './Header.css'
export default function Header(props) {
  // const [user, setUser] = useState('Artur Calderon')

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

      <h5>Bem-Vindo, {props.User.nome} </h5>
      <img
        style={{ width: '2rem', heigth: '2rem', borderRadius: '1rem' }}
        src={props.User.photo}
      />
    </div>
  )
}
