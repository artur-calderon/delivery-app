import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeItem } from '../store/Reducers/Cart'

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

  function remover(id) {
    dispatch(removeItem(id))
  }

  function obs(item) {
    let prod = []
    item.map(i => {
      prod.push(i)
    })
    return (
      <>
        <p>Faça uma observação:</p>
        <textarea></textarea>
        <button onClick={() => fazPedido(prod)}>Fazer Pedido</button>
      </>
    )
  }
  function fazPedido(prod) {
    prod.map(val => {
      alert(val.id)
    })
  }
  return (
    <CartSection>
      {item.length > 0 ? (
        item.map((item, id) => {
          return (
            <div className="content-prod" key={id}>
              <div className="content-img">
                <img src={item.data().arquivoURL} alt="Foto do Produto" />
              </div>
              <div className="info-Content">
                <h4 key={item.id}>{item.data().name}</h4>
                <p>{item.data().ingredientes}</p>
                <b>R${item.data().preco}</b>
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
  )
}