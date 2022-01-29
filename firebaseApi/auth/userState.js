import { firebaseApp } from 'firebaseApi/init'
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { getUser }  from "firebaseApi/firestoreDB/user"

const auth = getAuth(firebaseApp);

export const authChanged = (onChange) => {
    onAuthStateChanged(auth, user => {
        if(user){
            getUser(user.uid)
                .then( resp => {
                    return {
                        ...user,
                        ...resp
                    }
                })
                .then( udata => {
                    onChange(udata)
                })
                .catch( err => {
                    console.error({err})
                    onChange(null)
                })
        }
        else{
            onChange(null)
        }

    });
} 