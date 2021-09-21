import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ProductData.css'
import { db } from '../firebase'
// import Modal from './Modal'

export default function ProductData() {
  const [category, setCategory] = useState([])
  const product = useSelector(state => state)

  //Sempre que for usar evento de click, usar uma chamada para função no elemento react
  function toggleContent(e) {
    let elementChild = document.querySelector('#' + e.target.innerHTML)

    if (elementChild.classList.contains('--selected')) {
      elementChild.classList.remove('--selected')
    } else {
      elementChild.classList.add('--selected')
    }
  }
  useEffect(() => {
    db.collection('categoria').onSnapshot(cat => {
      setCategory(
        cat.docs.map(val => {
          return { id: val.id, cat: val.data().categoryName }
        })
      )
    })
  }, [])

  console.log(category)

  function getData(item) {
    alert(item.ingredientes)
  }

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion__item">
          <div className="accordion__header">
            <div className="accordion__title">
              {category.map(val => {
                const cat = product.find(p => p.categoria === val.cat)
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
                          if (val.cat === item.categoria) {
                            return (
                              <div className="content-prod" key={idx}>
                                <div className="content-img">
                                  <img
                                    src={item.arquivoURL}
                                    alt="Foto do Produto"
                                  />
                                </div>
                                <div className="info-Content">
                                  <h4 key={item.id}>{item.name}</h4>
                                  <p>{item.ingredientes}</p>
                                  <b>R${item.preco}</b>
                                  <button onClick={() => getData(item)}>
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
    </React.Fragment>
  )
}
