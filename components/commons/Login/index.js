import { useState } from "react"
import { AuthFacebookGooogle } from './AuthFacebookGoogle' 
import { useUI } from "components/UIcontext"
import { login } from 'firebase/client'
import { VerifyEmail } from './VerifyMail'
import { Reset } from './ResetPass'
import { Spinner } from 'components/icons'
import { colors } from 'styles/theme'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'


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

            <AuthFacebookGooogle />

            <div className="register-section">
                <button className="btn btn-info" onClick={() => setModalView('registro') }>Regístrate</button>
            </div>


            <style jsx>{style}</style>
        </div>
    )
}