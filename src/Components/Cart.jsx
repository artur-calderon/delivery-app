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
    console.log(id)
    dispatch(removeItem(id))
  }
  return (
    <CartSection>
      {item.length > 0 ? (
        item.map((item, id) => {
          return (
            <div className="content-prod" key={id}>
              <div className="content-img">
                <img src={item.arquivoURL} alt="Foto do Produto" />
              </div>
              <div className="info-Content">
                <h4 key={item.id}>{item.name}</h4>
                <p>{item.ingredientes}</p>
                <b>R${item.preco}</b>
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
    </CartSection>
  )
}
