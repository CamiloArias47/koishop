import { useState } from 'react'
import style from './style'
import { colors } from 'styles/theme'
import { verifyEmail } from 'firebase/client'
import { SuccessAnimation, Spinner } from 'components/icons'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'


const SEND_STATE = {
    NONE:'no 😐',
    SENDING:'enviando 🤔',
    SUCCESS: 'enviado 🤠',
    FAIL:'fallo 😞'
}

const VerifySended = ()=> {
    return(
        <div className="modal">
            <SuccessAnimation/>
            <h1>!Enviado¡</h1>
            <p>Revisa la bandeja de tu correo🧐</p>

            <style jsx>{style}</style>
        </div>
    )
}


export const VerifyEmail = ()=>{

    const [ verificationSended, setVerificationSended ] = useState(SEND_STATE.NONE)

    const send = ()=>{
        setVerificationSended(SEND_STATE.SENDING)
         verifyEmail()
            .then( ()=>{
                setVerificationSended(SEND_STATE.SUCCESS)
            })
            .catch( ()=>{
                setVerificationSended(SEND_STATE.FAIL)
            }) 
    }

    if(verificationSended === SEND_STATE.SUCCESS) return <VerifySended/>

    const messageError =  verificationSended === SEND_STATE.FAIL 
        ? <ErrorInline defaultText="Lo sentimos 🙏 no llego tu correo, intentalo en unos minutos." /> 
        : null 

    return(
        <div className="modal">
            <h1>¡Ups! 🤔</h1>
            <p>parece que no has verificado tu correo.</p>
            { messageError }
            <button className="btn btn-primary" 
                    onClick={send} 
                    disabled={verificationSended === SEND_STATE.SENDING ? true : false}>
                Enviar correo de verificación 
                {verificationSended === SEND_STATE.SENDING ? <Spinner width="38" height="38" color={colors.primaryDark} /> : null}
            </button>


            <style jsx>{style}</style>
        </div>
    )
}