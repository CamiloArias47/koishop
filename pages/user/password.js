import { useState } from 'react'
import UserLayout from 'components/commons/UserLayout'
import style from 'styles/style-user'
import { revalidateuser, updatePass } from 'firebaseApi/client'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'
import { Spinner } from 'components/icons'
import { colors } from 'styles/theme'

const STATE_CHANGE = {
    NONE : 0,
    SENDING : 1,
    FAIL : 2,
    SUCCESS : 3
}

export default function ChangePassword(){

    const [ password, setPassword] = useState('')
    const [ newPassword, setNewPassword] = useState('')
    const [ confirmPassword, setConfirmPassword] = useState('')
    const [ state, setState ] = useState(STATE_CHANGE.NONE)

    const handlerChange = event =>{
        let { name, value} = event.target

        if(name === 'current-password') setPassword(value)
        if(name === 'new-password') setNewPassword(value)
        if(name === 'confirm-password') setConfirmPassword(value)
        if(state.code !== undefined) setState(STATE_CHANGE.NONE)
    }

    const handlerSubmit = event => {
        event.preventDefault()

        if(newPassword !== confirmPassword){
            setState({code:'auth/diff-two-password'})
            return false
        }

        setState(STATE_CHANGE.SENDING)

        revalidateuser(password)
            .then( () =>{
                updatePass(newPassword).then( (res) =>{
                    console.log({res})
                    setState(STATE_CHANGE.SUCCESS)
                    setPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                })
                .catch( error=>{
                    setState({code:error.code})
                })
            })
            .catch( error=>{
                setState({code:error.code})
            })
    }

    const errorText = (state.code !== undefined) 
            ? <ErrorInline code={state.code} defaultText="¡Ups! lo sentimos, intentalo unos minutos más tarde." />
            : null 

    const disableButton = (state === STATE_CHANGE.SENDING || state.code !== undefined) ? true : false
    
    const showSpinner = state === STATE_CHANGE.SENDING ? <Spinner width="38" height="38" color={colors.primaryDark} /> : null

    const successMesage = state === STATE_CHANGE.SUCCESS 
            ? (<div className="success-message">
                ¡Contraseña actualizada!
            </div>)
            : null

    return(
        <UserLayout>
            <h1>Cambio de contraseña</h1>
            <form onSubmit={handlerSubmit}>
                <div className="form-controller">
                    <label htmlFor="current-password">Contraseña anterior</label>
                    <input type="password" name="current-password" value={password} id="current-password" onChange={handlerChange} className="input input-primary" required/>
                </div>
                <div className="form-controller">
                    <label htmlFor="new-password">Contraseña nueva</label>
                    <input type="password" name="new-password" value={newPassword} id="new-password" onChange={handlerChange} className="input input-primary" required/>
                </div>
                <div className="form-controller">
                    <label htmlFor="confirm-password">Confirmar contraseña nueva</label>
                    <input type="password" name="confirm-password" value={confirmPassword} id="confirm-password" onChange={handlerChange} className="input input-primary" required/>
                </div>
                { errorText }
                { successMesage }
                <button className="btn btn-primary" disabled={disableButton}>
                    Cambiar { showSpinner }
                </button>
            </form>

            <a>¿Olvidate tu contraseña?</a>

            <style jsx>{style}</style>
        </UserLayout>
    )
}