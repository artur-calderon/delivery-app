import React from 'react'
import { ContainerLogin, LogoLogin } from '../styles/styles'
import '../Components/Login.css'
import { GoogleLogin } from 'react-google-login'

export default function Login({ logaGoogle }) {
  return (
    <ContainerLogin>
      <LogoLogin
        src="https://i.pinimg.com/originals/b1/fc/bb/b1fcbbfd4fb8116c714ef352bb39bbaf.jpg"
        alt="Logo"
      />
      {/* <div className="google-btn" onClick={() => logaGoogle()}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">
          <b>Logar Com Google</b>
        </p>
      </div> */}
      <GoogleLogin
        clientId={
          '558850311827-r92555jdbc3jvhq0f0oult7hnaide6e0.apps.googleusercontent.com'
        }
        buttonText="Log in with Google"
        onSuccess={logaGoogle}
        onFailure={logaGoogle}
        isSignedIn={false}
      />
      <a href="" className="fb connect btn-text">
        Logar com Facebook
      </a>
      {/* // <Buttons onClick={() => logaGoogle()}>Logar Com Google</Buttons>
      // <Buttons>Logar com Facebook</Buttons> */}
    </ContainerLogin>
  )
}
