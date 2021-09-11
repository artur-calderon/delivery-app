import React from 'react'
import './Modal.css'

function Modal({children, itemCart}) {
  console.log(itemCart);
  return (
    <div className="modal">
     {children}
    </div>
    // <div className="modal ">
    //   <div className="content-prod">
    //     <div className="content-img">
    //       <img src={itemCart.info.arquivoURL} alt="Foto do Produto" />
    //     </div>
    //     <div className="info-Content">
    //       <h4 key={itemCart.id}>{itemCart.info.name}</h4>
    //       <p>{itemCart.info.ingredientes}</p>
    //       <b>R${itemCart.info.preco}</b>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Modal
