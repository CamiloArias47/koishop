
import { firebaseApp } from 'firebaseApi/init'
import { getAuth,
         GoogleAuthProvider,
         signInWithPopup,
         FacebookAuthProvider
         } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const loginGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
}

export const loginFacebook = () =>{
    let provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider)
}