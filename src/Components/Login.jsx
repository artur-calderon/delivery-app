import React from 'react'
import { ContainerLogin, LogoLogin } from '../styles/styles'
import '../Components/Login.css'

export default function Login({ logaGoogle }) {
  return (
    <ContainerLogin>
      <LogoLogin
        src="https://i.pinimg.com/originals/b1/fc/bb/b1fcbbfd4fb8116c714ef352bb39bbaf.jpg"
        alt="Logo"
      />
      <div class="google-btn" onClick={() => logaGoogle()}>
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text">
          <b>Logar Com Google</b>
        </p>
      </div>
      <a href="" class="fb connect">
        Logar com Facebook
      </a>
      {/* // <Buttons onClick={() => logaGoogle()}>Logar Com Google</Buttons>
      // <Buttons>Logar com Facebook</Buttons> */}
    </ContainerLogin>
  )
}
