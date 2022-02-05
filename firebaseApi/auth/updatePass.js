import { firebaseApp } from 'firebaseApi/init'
import { 
    getAuth, 
    updatePassword, 
    reauthenticateWithCredential,
    signInWithCredential,
    EmailAuthProvider,
    GoogleAuthProvider
} from "firebase/auth";

const auth = getAuth(firebaseApp);

export const revalidateuser = ({provider = 'password', password = '', accessToken = ''}) =>{
    const user = auth.currentUser;
    let credential

    if(provider === 'password') credential = EmailAuthProvider.credential(user.email, password)
    if(provider === 'google.com'){
        credential = GoogleAuthProvider.credential(null, accessToken)
        console.log({credential})
        return signInWithCredential(auth,credential)
    } 
        
    if(provider === 'facebook.com') credential = FacebookAuthProvider.credential(accessToken)


    return reauthenticateWithCredential(user, credential)
}

export const updatePass = newPass =>{
    const user = auth.currentUser;
    return updatePassword(user, newPass)
}