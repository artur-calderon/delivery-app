import React, { useState } from 'react'
import { useEffect } from 'react'
import { query, collection, where, onSnapshot, db } from '../firebase'

export default function StatusPedido({ ped }) {
  const [pedido, setPedido] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, 'pedido'),
      where('pedido.nomeCliente', '==', 'Artur Alexandre')
    )
    onSnapshot(q, res => {
      setPedido(res.docs)
    })
  }, [])

  return (
    <div>
      <h1>Status do pedido</h1>
      {pedido.map((val, key) => {
        return (
          <div key={key}>
            <h3>Pedido: {val.data().pedido.pedidoNome}</h3>
            <p>Status do pedido: {val.data().pedido.statusPedido}</p>
            <button onClick={() => ped(false)}>Recebi o Pedido</button>
          </div>
        )
      })}
    </div>
  )
}
