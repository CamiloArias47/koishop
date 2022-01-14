import { useState } from "react"
import { resetPassword } from 'firebaseApi/client'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'
import { SuccessAnimation } from "components/icons"
import style from "./style"

const STATE_RESET = {
    NONE: 0,
    REQUESTING: 1,
    SUCCESS: 3,
    FAIL: 4
}

const SendedMail = ()=>{
    return (
        <div className="modal">
            <SuccessAnimation/>
            <h1>¡Enviado!</h1>
            <p>Revisa tus mensajes entrantes para restablecer tu contraseña</p>

            <style jsx>{style}</style>
        </div>
    )
}

export const Reset = ({email})=>{
    const [ mail, setMail ] = useState(email)
    const [ state, setState ] = useState(STATE_RESET.NONE)

    const handlerChange = event =>{
        const { name, value } = event.target
        setMail(value)
    }

    const handlerSubmit = event=>{
        event.preventDefault()

        resetPassword(mail)
            .then( ()=>{
                setState(STATE_RESET.SUCCESS)
            })
            .catch(error =>{
                console.log({error})
                setState(error)
            })
    }

    if(state === STATE_RESET.SUCCESS) return <SendedMail/>

    const erroMessage = state.code !== undefined
        ? <ErrorInline code={ state.code} defaultText="No se envio el correo de verificación, intentalo en unos minutos por favor."/>
        : null

    return(
        <div className="modal">
            <h1>Restablecer contraseña</h1>
            <form onSubmit={handlerSubmit}>
                <p>Te enviaremos un correo para que cambies tu contraseña</p>
                <input className="input input-primary" type="text" name="mail" value={mail} onChange={handlerChange} placeholder="email" required />
                { erroMessage }
                <button className="btn btn-primary">
                    Continuar
                </button>
            </form>

            <style jsx>{style}</style>
        </div>
    )
}