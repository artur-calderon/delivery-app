import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart(props) {
  console.log(props.itemCart)
  return (
    <div>
      <h1>Cart</h1>
      <h1>{props.itemCart}</h1>
      <Link to="/">
        <h1>Voltar</h1>
      </Link>
    </div>
  )
}
