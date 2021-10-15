import React from 'react'
import { db } from '../firebase'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import './PromotionCard.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

export default function PromotionCard() {
  const [show, setShow] = useState([])

  useEffect(() => {
    db.collection('produtos').onSnapshot(data => {
      setShow(
        data.docs.map(item => {
          return { id: item.id, info: item.data() }
        })
      )
    })
  }, [])

  return (
    <div className="show">
      <h3>Promoções</h3>

      <Swiper spaceBetween={10} slidesPerView={3}>
        {/* Arrumar o preço pra pegar os centavos direto do Bando de dados */}
        {show.map(val => {
          return (
            <SwiperSlide key={val.id}>
              <div className="card">
                <div className="img-Card">
                  <img src={val.info.arquivoURL} alt="" />
                </div>
                <h5>{val.info.name}</h5>
                <p>
                  <b>R${val.info.preco}</b>
                </p>
                {/* <button>Pedir</button> */}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
