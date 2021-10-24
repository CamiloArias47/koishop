import db from './db'
import { doc, getDoc, setDoc } from "firebase/firestore"


export const getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if ( docSnap.exists() ) {
      return docSnap.data() 
    } else {
      return false;
    }
}

export const setUser = async ({user}) => {
console.log({user})
  const {uid, displayName, email, phoneNumber, emailVerified, photoURL} = user

  const resp = await setDoc(doc(db, "users", uid), {
    name : displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
  });

  console.log({resp})

}