import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusPedido from './StatusPedido'

import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../store/Reducers/Cart'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import styled from 'styled-components'
import Header from './Header'
import './Cart.css'

import {
  db,
  onAuthStateChanged,
  auth,
  addDoc,
  collection,
  query,
  onSnapshot
} from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

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
  const [userAuth, setUserAuth] = useState({ displayName: 'User Name' })
  const [statusPedido, setStatusPedido] = useState(false)
  const [observ, setObserv] = useState('')
  const modal = withReactContent(Swal)
  const [cantOrder, setCantOrder] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserAuth(user)
    })

  })
  useEffect(()=>{
    const q = query(doc(db, 'clientes', userAuth.displayName.replace(/ /g, '')))
    onSnapshot(q, res => {
      console.log(res.data())
      if(res.data())
      if (res.data().endereco == null || res.data().telefone == null) {
        setCantOrder(false)
      } else {
        return setCantOrder(true)
      }
    })
  })


  async function Modal() {
    const { value: formValues } = await modal.fire({
      title: 'Adicione os dados que faltam',
      padding: 0,
      html:
        '<h3>Endereço:</h3>' +
        '<input id="swal-input1" class="swal2-input">' +
        '<h3>Telefone:</h3>' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })

    if (formValues) {
      // Swal.fire(JSON.stringify(formValues))
      console.log(formValues[0])
      const refDoc = doc(db, 'clientes', userAuth.displayName.replace(/ /g, ''))
      await updateDoc(refDoc, {
        endereco: formValues[0],
        telefone: formValues[1]
      })
        .then(() => {
          console.log('Certo')
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

  // antes de fazer o pedido verifica se o user tem cadastrados os endereço e o telefone


  function remover(id) {
    dispatch(removeItem(id))
  }

  function obs(item) {
    let total = null

    item.map(it => {
      let preco2 = it.data().preco

      return (total += parseFloat(preco2))
    })

    function handleChange(event) {
      // event.preventDefault()
      setObserv(event.target.value)
    }

    return (
      <>
        <p>
          Total:
          {total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
        <form onSubmit={e => fazPedido(item, total, observ, e)}>
          <p>Faça uma observação:</p>
          <textarea onChange={handleChange} value={observ}></textarea>
          <button type="submit">Fazer Pedido</button>
        </form>
      </>
    )
  }

  function fazPedido(prod, total, observacao, e) {
    e.preventDefault()
    if (cantOrder !== true) {
      Modal()
    } else
    prod.map(val => {
      let pedido = {
        nomeCliente: userAuth.displayName,
        pedidoNome: val.data().name,
        observacao: observacao,
        valorUnit: val.data().preco,
        total,
        statusPedido: 'Aguardando aprovação'
      }

      console.log(pedido)

      addDoc(collection(db, 'pedido'), { pedido })
        .then(() => {
          setStatusPedido(true)
          modal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pedido realizado com sucesso!',
            showConfirmButton: true,
            timer: 3000
          })
          remover(val.id)
        })
        .catch(err => {
          console.log(err)
          modal.fire({
            position: 'center',
            icon: 'error',
            title: 'hum... Parece que algo deu errado!',
            showConfirmButton: true,
            timer: 3000
          })
        })
    })


  }

  //renderiza de acordo com o status do pedido
  if (statusPedido) {
    return (
      <>
        <Header User={userAuth} />
        <CartSection>
          <StatusPedido ped={setStatusPedido} />
        </CartSection>
      </>
    )
  } else {
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
}
