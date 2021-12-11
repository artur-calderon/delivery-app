import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/Reducers/Cart'

import styled from 'styled-components'
import Header from './Header'

import { db, onAuthStateChanged, auth, addDoc, collection } from '../firebase'

const CartSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem 1rem 0 1rem;
`
export default function Cart() {
  const item = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [userAuth, setUserAuth] = useState(null)
  const [statusPedido, setStatusPedido] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })
  })

  function remover(id) {
    dispatch(removeItem(id))
  }

  function obs(item) {
    let total = null

    item.map(it => {
      let preco2 = it.data().preco

      return (total += preco2)
    })

    return (
      <>
        <p>
          Total:
          {total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
        <p>Faça uma observação:</p>
        <textarea></textarea>

        <button onClick={() => fazPedido(item, total)}>Fazer Pedido</button>
      </>
    )
  }

  function fazPedido(prod, total) {
    prod.map(val => {
      let pedido = {
        nomeCliente: userAuth.displayName,
        pedidoNome: val.data().name,
        valor: total
      }

      console.log(pedido)

      addDoc(collection(db, 'pedido'), { pedido })
        .then(() => {
          setStatusPedido(true)
          console.log('> Pedido enviado!')
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  return (
    <>
      <Header User={userAuth} />
      <CartSection>
        {item.length > 0 ? (
          item.map((item, id) => {
            let valor = item.data().preco.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })

            return (
              <div className="content-prod" key={id}>
                <div className="content-img">
                  <img src={item.data().arquivoURL} alt="Foto do Produto" />
                </div>
                <div className="info-Content">
                  <h4 key={item.id}>{item.data().name}</h4>
                  <p>{item.data().ingredientes}</p>
                  <b>{valor}</b>
                  <button onClick={() => remover(item.id)}>Remover</button>
                </div>
              </div>
            )
          })
        ) : (
          <h3>Sem produtos no carrinho</h3>
        )}

        <Link to="/">
          <h1>Voltar</h1>
        </Link>

        {item.length > 0 ? obs(item) : null}
      </CartSection>
    </>
  )
}
