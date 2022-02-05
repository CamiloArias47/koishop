import { useState, useEffect, useRef } from 'react'
import withAuth from 'HOC/whitAuth'
import { authChanged } from "firebaseApi/auth/userState"
import UserLayout from 'components/commons/UserLayout'
import { revalidateuser, updatePass } from 'firebaseApi/auth/updatePass'
import { loginGoogle, loginFacebook } from  'firebaseApi/auth/loginGoogleFacebook'
import { ErrorInline } from 'components/commons/ErrorMesage/InlineError'
import { Spinner } from 'components/icons'
import { colors } from 'styles/theme'
import style from 'styles/style-user'

const STATE_CHANGE = {
    NONE : 0,
    SENDING : 1,
    FAIL : 2,
    SUCCESS : 3
}

const TYPE_FORM = {
    loading : 'l',
    create : 'c',
    change : 'h'
}

const ChangePassword = () => {

    const [ password, setPassword] = useState('')
    const [ newPassword, setNewPassword] = useState('')
    const [ confirmPassword, setConfirmPassword] = useState('')
    const [ createPassword, setCreatePassword ] = useState('')
    const [ createPassConfirm, setCreatePassConfirm ] = useState('')
    const [ typeOfForm, setTypeOfForm ] = useState(TYPE_FORM.loading)
    const [ state, setState ] = useState(STATE_CHANGE.NONE)
    const accessToken = useRef('') 
    const provider = useRef('password') 

    useEffect( () => {
        authChanged( user => {
            if( user ){
                const hasPassword = user.providerData.find( elem => elem.providerId === 'password')
                const setType = hasPassword ? TYPE_FORM.change : TYPE_FORM.create
    
                if(!hasPassword) provider.current = user.providerData[0].providerId
    
                accessToken.current = user.accessToken
                setTypeOfForm(setType)
            }
        })
    },[])

    const handlerChange = event =>{
        let { name, value} = event.target

        if(name === 'current-password') setPassword(value)
        if(name === 'new-password') setNewPassword(value)
        if(name === 'confirm-password') setConfirmPassword(value)
        if(name === 'create-password') setCreatePassword(value)
        if(name === 'create-password-confirm') setCreatePassConfirm(value)
        if(state.code !== undefined) setState(STATE_CHANGE.NONE)
    }

    const handlerSubmit = event => {
        event.preventDefault()

        if(newPassword === '' || (newPassword !== confirmPassword) ){
            setState({code:'auth/diff-two-password'})
            return false
        }

        setState(STATE_CHANGE.SENDING)

        revalidateuser({password})
            .then( () => { updatePass(newPassword) })
            .then( updatedPasswordSuccess )
            .catch( error => { setState({code:error.code}) })
    }

    const handlerCreatePassword = event => {
        event. preventDefault()

        if(createPassword === '' || (createPassword !== createPassConfirm) ){
            setState({code:'auth/diff-two-password'})
            return false
        }

       updatePass(createPassword)
        .then( updatedPasswordSuccess )
        .catch( error => {
            console.log({error})
            if(error.code === 'auth/requires-recent-login'){
                if( provider.current === 'google.com'){
                    reloginGoogle()
                }
                if( provider.current === 'facebook.com'){
                    reloginFacebook()
                }
            }
            setState({code:error.code})
        })

        setState(STATE_CHANGE.SENDING)
    }

    const updatedPasswordSuccess = (res) => {
        console.log({res})
        setState(STATE_CHANGE.SUCCESS)
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setCreatePassword('')
        setCreatePassConfirm('')
    }

    const reloginGoogle = () => {
        loginGoogle().catch( error => setState({code:error.code}) )
    }

    const reloginFacebook = () => {
        loginFacebook().catch( error => setState({code:error.code}) )
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
    
    
    if(typeOfForm === TYPE_FORM.loading){
        return <UserLayout><h1>'Cargando...'</h1></UserLayout>
    }
    else if(typeOfForm === TYPE_FORM.change){
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
    else if(typeOfForm === TYPE_FORM.create){
        return (
            <div>
                <UserLayout>
                    <h1>Crear contraseña</h1>
                    <form onSubmit={handlerCreatePassword}>
                        <div className="form-controller">
                            <label htmlFor="create-password">Contraseña*</label>
                            <input type="password" name="create-password" value={createPassword} id="create-password" onChange={handlerChange} className="input input-primary" required/>
                        </div>
                        <div className="form-controller">
                            <label htmlFor="create-password-confirm">Confirmar Contraseña*</label>
                            <input type="password" name="create-password-confirm" value={createPassConfirm} id="create-password-confirm" onChange={handlerChange} className="input input-primary" required/>
                        </div>

                        { errorText }
                        { successMesage }

                        <button className="btn btn-primary" disabled={disableButton}>
                            Cambiar { showSpinner }
                        </button>
                    </form> 
                </UserLayout>
            </div>
        )
    }

}

export default withAuth(ChangePassword)
