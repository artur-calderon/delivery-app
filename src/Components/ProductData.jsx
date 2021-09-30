import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ProductData.css'
import { db } from '../firebase'
import { addItem } from '../store/Reducers/Cart'
import { FaCartPlus } from 'react-icons/fa'

export default function ProductData() {
  const [category, setCategory] = useState([])
  const product = useSelector(state => state.prod)
  const dispatch = useDispatch()
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
        cat.docs.map(function (val) {
          return { id: val.id, cat: val.data().categoryName }
        })
      )
    })
  }, [])

  function getData(car, e) {
    e.preventDefault()
    dispatch(addItem(car))
  }

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion__item">
          <div className="accordion__header">
            <div className="accordion__title">
              {category.map(val => {
                const cat = product.find(p => p.data().categoria === val.cat)
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
                        {product.map(item => {
                          if (val.cat === item.data().categoria) {
                            return (
                              <div className="content-prod" key={item.id}>
                                <div className="content-img">
                                  <img
                                    src={item.data().arquivoURL}
                                    alt="Foto do Produto"
                                  />
                                </div>
                                <div className="info-Content">
                                  <h4 key={item.id}>{item.data().name}</h4>
                                  <p>{item.data().ingredientes}</p>
                                  <b>R${item.data().preco}</b>
                                  <FaCartPlus
                                    onClick={e => getData(item, e)}
                                    fontSize="2rem"
                                  />
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
