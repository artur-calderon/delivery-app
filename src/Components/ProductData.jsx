import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import './ProductData.css'


export default function ProductData() {
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {

    db.collection('categoria').onSnapshot((item) => {
      setCategory(item.docs.map((val) => {

        return { id: val.id, cat: val.data().categoryName }
      }))

    })
  }, [])

  useEffect(() => {
    db.collection('produtos').orderBy('categoria').onSnapshot((data) => {
      setProduct(data.docs.map((item) => {
        return { id: item.id, cat: item.data().categoria, info: item.data() }



      }))
    })

  }, [])

  //Sempre que for usar evento de click, usar uma chamada para função no elemento react
  function toggleContent(e) {
    let elementChild = document.querySelector('#' + e.target.innerHTML)
    console.log(e.detail)
    if (elementChild.classList.contains('--selected')) {
      elementChild.classList.remove('--selected')
    } else {
      elementChild.classList.add('--selected')
    }
  }

  return (
    <div>
      <div className="accordion">

        <div className="accordion__item">

          <div className="accordion__header">
            <div className="accordion__title">
              {
                category.map((val) => {
                  const cat = product.find((user) => user.cat === val.cat)
                  if (cat) {
                    return (
                      <div>
                        <h1 onClick={e => toggleContent(e)} key={val.id} className="title-prod">{val.cat}</h1>
                        <div id={val.cat} className="accordion__content">
                          {
                            product.map((item) => {

                              if (val.cat === item.info.categoria) {
                                return (
                                  <div className="content-prod">
                                    <div className="content-img">
                                      <img src={item.info.arquivoURL} alt="Foto do Produto" />
                                    </div>
                                    <div className="info-Content">
                                      <h4 key={item.id}>{item.info.name}</h4>
                                      <p>{item.info.ingredientes}</p>
                                      <b>R${item.info.preco}</b>
                                    </div>
                                  </div>
                                )
                              }

                            })
                          }
                        </div>

                      </div>

                    )

                  }

                })
              }
            </div>
          </div>

        </div>

      </div>


    </div >
  )
}