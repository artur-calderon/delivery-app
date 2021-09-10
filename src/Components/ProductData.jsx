import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import './ProductData.css'
import Modal from './Modal'

export default function ProductData() {
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [cart, setCart] = useState([])
  const [isVisibleModal, setVisibleModal] = useState(false)

  useEffect(() => {
    db.collection('categoria').onSnapshot(item => {
      setCategory(
        item.docs.map(val => {
          return { id: val.id, cat: val.data().categoryName }
        })
      )
    })
  }, [])

  useEffect(() => {
    db.collection('produtos')
      .orderBy('categoria')
      .onSnapshot(data => {
        setProduct(
          data.docs.map(item => {
            return {
              id: item.id,
              cat: item.data().categoria,
              info: item.data()
            }
          })
        )
      })
  }, [])

  //Sempre que for usar evento de click, usar uma chamada para função no elemento react
  function toggleContent(e) {
    let elementChild = document.querySelector('#' + e.target.innerHTML)

    if (elementChild.classList.contains('--selected')) {
      elementChild.classList.remove('--selected')
    } else {
      elementChild.classList.add('--selected')
    }
  }

  function addToCart(item) {
    setCart([...cart, item])
    console.log(cart)
  }

  function renderCart() {
    ;<>
      {cart.map((item, idx) => {
        return (
          <div className="content-prod" key={idx}>
            <div className="content-img">
              <img src={item.info.arquivoURL} alt="Foto do Produto" />
            </div>
            <div className="info-Content">
              <h4 key={item.id}>{item.info.name}</h4>
              <p>{item.info.ingredientes}</p>
              <b>R${item.info.preco}</b>
              {/* <button onClick={()=> addToCart(item)}>Add To Cart</button> */}
            </div>
          </div>
        )
      })}
    </>
  }
  function algo(item) {
    <Modal itemCart={item}/>
    addToCart(item)
    setVisibleModal(true);
    console.log(isVisibleModal);
    
  }

  return (
    <div>
      {isVisibleModal ? <Modal/> : null}
      <div className="accordion">
        <div className="accordion__item">
          <div className="accordion__header">
            <div className="accordion__title">
              {category.map(val => {
                const cat = product.find(user => user.cat === val.cat)
                if (cat) {
                  return (
                    <div>
                      <h1
                        onClick={e => toggleContent(e)}
                        key={val.id}
                        className="title-prod"
                      >
                        {val.cat}
                      </h1>
                      <div id={val.cat} className="accordion__content">
                        {product.map((item, idx) => {
                          if (val.cat === item.info.categoria) {
                            return (
                              <div className="content-prod" key={idx}>
                                <div className="content-img">
                                  <img
                                    src={item.info.arquivoURL}
                                    alt="Foto do Produto"
                                  />
                                </div>
                                <div className="info-Content">
                                  <h4 key={item.id}>{item.info.name}</h4>
                                  <p>{item.info.ingredientes}</p>
                                  <b>R${item.info.preco}</b>
                                  <button onClick={() => algo(item)}>
                                    Add To Cart
                                  </button>
                                </div>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
