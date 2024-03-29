import { useState } from 'react'
import { loginGoogle, loginFacebook } from 'firebaseApi/auth/loginGoogleFacebook'
import { getUser, setUser } from 'firebaseApi/firestoreDB/user'
import { useUI } from 'components/UIcontext'
import Image from 'next/image'
import googleIcon from 'public/images/logos/google.svg'
import facebookIcon from 'public/images/logos/facebook.svg'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'

export const AuthFacebookGooogle = () => {
  const [stateLogin, setStateLogin] = useState('initial')
  const { closeModal } = useUI()

  const successLogin = result => {
    const user = getUser(result.user.uid)
    user.then(res => {
      if (!res) {
        // verificar el res paa setia en el setuser
        setUser({ user: result.user })
      }
    })

    closeModal()
  }

  const handlerGoogleLogin = () => {
    loginGoogle()
      .then(successLogin)
      .catch(setStateLogin)
  }

  const handlerFacebookLogin = () => {
    loginFacebook()
      .then(result => { successLogin(result) })
      .catch(error => {
        setStateLogin(error)
      })
  }

  const messageError = stateLogin.code !== undefined ? <ErrorInline code={stateLogin.code} /> : null

  return (
        <div className="login-with">
            <h3>O Inicia session con:</h3>
            <button className="btn btn-info" onClick={handlerGoogleLogin}>
                <Image src={googleIcon} width="24" height="24" alt="Google"/>
            </button>
            <button className="btn btn-info" onClick={handlerFacebookLogin}>
                <Image src={facebookIcon} width="24" height="24" alt="Facebook"/>
            </button>
            {messageError}
        </div>
  )
}
