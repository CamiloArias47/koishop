import { firebaseApp } from './init'
import { getAuth, 
         onAuthStateChanged,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword,
         sendEmailVerification,
         sendPasswordResetEmail,
         reauthenticateWithCredential,
         EmailAuthProvider,
         updatePassword,
         GoogleAuthProvider,
         signInWithPopup,
         FacebookAuthProvider,
         signOut } from "firebase/auth";


const auth = getAuth(firebaseApp);


export const authChanged = (onChange) => {
    onAuthStateChanged(auth, user => {
        onChange(user)
    });
} 


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


export const revalidateuser = (password) =>{
    const user = auth.currentUser;
    var credential = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credential)
}

export const updatePass = newPass =>{
    const user = auth.currentUser;
    return updatePassword(user, newPass)
}


export const loginGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
}

export const loginFacebook = () =>{
    let provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider)
}

