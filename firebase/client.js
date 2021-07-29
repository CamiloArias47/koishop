import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

//const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
const firebaseConfig = {
    apiKey: "AIzaSyBMl8zmQUWfDFxqZ906vpLua1oYK24fJKk",
    authDomain: "koishop-dev.firebaseapp.com",
    projectId: "koishop-dev",
    storageBucket: "koishop-dev.appspot.com",
    messagingSenderId: "484415257007",
    appId: "1:484415257007:web:1b93693dd488f41cf0975a"
  }


if(firebase.apps.length === 0) firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();

export const authChanged = (onChange) => {
    firebase.auth().onAuthStateChanged((user) => {
        onChange(user)
      });
} 


export const login = ({email,password}) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        return userCredential.user;
    })
}


export const logout = () => {
   return firebase.auth().signOut()
}


export const register = ({email, password}) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        return user;
    }) 
}


export const verifyEmail = ()=> {
    return firebase.auth().currentUser.sendEmailVerification()
}


export const resetPassword = (email) =>{
    return firebase.auth().sendPasswordResetEmail(email)
}


export const revalidateuser = (password) =>{
    const user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(credential)
}

export const updatePass = newPass =>{
    const user = firebase.auth().currentUser;
    return user.updatePassword(newPass)
}


export const loginGoogle = ()=>{
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}

export const loginFacebook = () =>{
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}

