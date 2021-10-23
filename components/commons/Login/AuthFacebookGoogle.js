import { useState } from 'react'
import { loginGoogle, loginFacebook } from 'firebaseApi/client'
import { useUI } from "components/UIcontext"
import Image from "next/image"
import googleIcon from 'public/images/logos/google.svg'
import facebookIcon from 'public/images/logos/facebook.svg'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'

export const AuthFacebookGooogle = () =>{

    const [stateLogin, setStateLogin] = useState('initial')
    const { closeModal } = useUI()

    const handlerGoogleLogin = ()=>{
        loginGoogle()
            .then( result =>{
                closeModal()
            })
            .catch( error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log({errorCode, errorMessage, email, credential})
                setStateLogin(error)
            })
    }

    const handlerFacebookLogin = ()=>{
        loginFacebook()
            .then( (result)=>{
                console.log({result})
                let credential = result.credential;
                let token = credential.accessToken;
                let user = result.user;
                console.log({token, user, credential})
                closeModal()
            })
            .catch( error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log({errorCode, errorMessage, email, credential})
                setStateLogin(error)
            })
    }

    const messageError =  stateLogin.code !== undefined ? <ErrorInline code={stateLogin.code} /> : null 

    return(
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