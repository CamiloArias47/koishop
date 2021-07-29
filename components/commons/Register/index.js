import { useState } from "react"
import { useUI } from "components/UIcontext"
import { AuthFacebookGooogle } from 'components/commons/Login/AuthFacebookGoogle' 
import { register, verifyEmail } from 'firebase/client'
import Success from './Success'
import style from 'styles/style-modal-forms'
import { Spinner } from 'components/icons'
import { colors } from "styles/theme"
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'

const STATES = {
    NONE: 0,
    LOADING: 1,
    SUCCESS: 2
}

export const Register = () =>{
    const { setModalView, closeModal } = useUI()
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirm, setConfirm ] = useState('')
    const [ state, setState] = useState(STATES.NONE)
    const [ err, setErr ] = useState({})


    const handlerChange = event => {
        let { name, value } = event.target
        if(name === 'mail') setMail(value)
        if(name === 'password') setPassword(value)
        if(name === 'confirm-password') setConfirm(value)
        if(err.code !== undefined) setErr({})
    }

    const handleSubmit = event => {
        event.preventDefault()

        if(password !== confirm){
            setErr({code:"auth/diff-two-password"})
            return false;
        }

        setState(STATES.LOADING)

        register({email:mail,password})
            .then(user => {
                if(!user.emailVerified){
                    verifyEmail().then( () => {
                        setState(STATES.SUCCESS)
                    })
                }
                else{
                    closeModal()
                }
            })
            .catch(error=>{
                console.log({error})
                setErr(error)
                setState(STATES.NONE)
            }) 
    }


    const messageError =  err.code !== undefined 
        ? <ErrorInline code={err.code} defaultText="Ha ocurrido un error"/>
        : null 

    const isButtonDisabled = (state === STATES.LOADING || err.code !== undefined) ? true : false
    
    if (state === STATES.SUCCESS) return <Success/>

    const showSpinner = state === STATES.LOADING ? <Spinner width="38" height="38" color={colors.primaryDark} /> : null

    return(
        <div className="register-container">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input className="input input-primary" type="text" name="mail" value={mail} placeholder="💌 Correo" onChange={handlerChange} required/>
                <input className="input input-primary" type="password" name="password" value={password} placeholder="🤫 Contraseña" onChange={handlerChange} required/>
                <input className="input input-primary" type="password" name="confirm-password" value={confirm} placeholder="😉 Confirmanos tu contraseña" onChange={handlerChange} required/>
                {messageError}
                <button className="btn btn-primary" disabled={isButtonDisabled}>
                    Regístrate { showSpinner }
                </button>
            </form>

            <AuthFacebookGooogle/>

            <div className="goto-login-section">
                <button className="btn btn-info" onClick={() => setModalView('login') }>Ya tengo cuenta</button>
            </div>

            <style jsx>{style}</style>
        </div>
    )
}