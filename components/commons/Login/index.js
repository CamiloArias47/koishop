import { useState } from "react"
import Image from "next/image"
import { useUI } from "components/UIcontext"
import { login, loginGoogle, loginFacebook } from 'firebase/client'
import { VerifyEmail } from './VerifyMail'
import { Reset } from './ResetPass'
import { Spinner } from 'components/icons'
import { colors } from 'styles/theme'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'
import googleIcon from 'public/images/logos/google.svg'
import facebookIcon from 'public/images/logos/facebook.svg'

import style from 'styles/style-modal-forms'

const MODAL_STATE = {
    REQUESTING : 'waiting...',
    LOGIN_VIEW : 'login-view',
    VERIFY_VIEW : 'verify-view',
    RESET_VIEW : 'reset-view',
    ERROR: '😡',
    LOGEDIN : '😉'
}

export const Login = () => {
    const { setModalView, closeModal } = useUI()
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ stateLogin, setStateLogin ] = useState(MODAL_STATE.LOGIN_VIEW)

    const handlerChange = (event)=>{
        let { value, name } = event.target
        if(name === 'mail') setMail(value)
        else setPassword(value)
    }

    const handlerSubmit = event => {
        event.preventDefault()
        setStateLogin(MODAL_STATE.REQUESTING)
        login({email:mail,password})
            .then( user => {
                if(!user.emailVerified){
                    setStateLogin(MODAL_STATE.VERIFY_VIEW)
                }
                else{
                    closeModal()
                }
            })
            .catch(error =>{
                console.log(error)
                setStateLogin(error)
            })
            
    }

    const handlerGoogleLogin = ()=>{
        loginGoogle()
            .then( result =>{
                let credential = result.credential;
                let token = credential.accessToken;
                let user = result.user;
                console.log({token, user})
                closeModal()
            })
            .catch( error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log({errorCode, errorMessage, email, credential})
            })
    }

    const handlerFacebookLogin = ()=>{
        loginFacebook()
            .then( (result)=>{
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
            })
    }

    if(stateLogin === MODAL_STATE.VERIFY_VIEW) return <VerifyEmail />
    if(stateLogin === MODAL_STATE.RESET_VIEW) return <Reset email={mail}/>

    const showSpinner = stateLogin === MODAL_STATE.REQUESTING ? <Spinner width="38" height="38" color={colors.primaryDark} /> : null 
    const deshabilitar = stateLogin === MODAL_STATE.REQUESTING ? true : false 
    const messageError =  stateLogin.code !== undefined ? <ErrorInline code={stateLogin.code} /> : null 

    return(
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handlerSubmit}>
                <input className="input input-primary" type="text" name="mail" id="mail" value={mail} placeholder="💌 Aquí va tu correo" onChange={handlerChange} required/>
                <input className="input input-primary" type="password" name="password" id="password" value={password} placeholder="🤫 Contraseña" onChange={handlerChange} required/>
                { messageError }
                <button className="btn btn-primary" disabled={deshabilitar}>
                            Entrar a koi {showSpinner}
                </button>
            </form>

            <p onClick={ ()=>{setStateLogin(MODAL_STATE.RESET_VIEW)} } className="reset-pass-link">
                ¿olvidaste tu contraseña cierto?
            </p>

            <div className="login-with">
                <h3>O Inicia session con:</h3>
                <button className="btn btn-info" onClick={handlerGoogleLogin}>
                    <Image src={googleIcon} width="24" height="24" alt="Google"/> 
                </button>
                <button className="btn btn-info" onClick={handlerFacebookLogin}>
                    <Image src={facebookIcon} width="24" height="24" alt="Facebook"/>
                </button>
            </div>

            <div className="register-section">
                <button className="btn btn-info" onClick={() => setModalView('registro') }>Regístrate</button>
            </div>


            <style jsx>{style}</style>
        </div>
    )
}