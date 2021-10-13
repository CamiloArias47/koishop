import { loginGoogle, loginFacebook } from 'firebaseApi/client'
import { getUser, setUser } from 'firebaseApi/firestoreDB/user'
import { useUI } from "components/UIcontext"
import Image from "next/image"
import googleIcon from 'public/images/logos/google.svg'
import facebookIcon from 'public/images/logos/facebook.svg'

export const AuthFacebookGooogle = () =>{

    const { closeModal } = useUI()

    const handlerGoogleLogin = ()=>{
        loginGoogle()
            .then( result =>{
                let user = getUser(result.user.uid)
                user.then( res => {
                    if(!res){
                        console.log({user_before: result.user })
                        setUser({user:result.user})
                    }
                })

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

    return(
        <div className="login-with">
            <h3>O Inicia session con:</h3>
            <button className="btn btn-info" onClick={handlerGoogleLogin}>
                <Image src={googleIcon} width="24" height="24" alt="Google"/> 
            </button>
            <button className="btn btn-info" onClick={handlerFacebookLogin}>
                <Image src={facebookIcon} width="24" height="24" alt="Facebook"/>
            </button>
        </div>
    )
} 