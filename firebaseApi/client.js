import { firebaseApp } from './init'
import { getAuth,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword,
         sendEmailVerification,
         sendPasswordResetEmail,
         signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const login = ({email,password}) =>{
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return userCredential.user;
    })
}

export const logout = () => {
   //return firebase.auth().signOut()
   const auth = getAuth();
   return signOut(auth)
}


export const register = ({email, password}) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        return user;
    }) 
}


export const verifyEmail = ()=> {
    return sendEmailVerification(auth.currentUser)
}


export const resetPassword = (email) =>{
    return sendPasswordResetEmail(auth, email)
}

