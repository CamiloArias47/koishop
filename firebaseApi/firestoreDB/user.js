import db from './db'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"


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
  const {uid, displayName, email, phoneNumber, emailVerified, photoURL} = user

  const resp = await setDoc(doc(db, "users", uid), {
    name : displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
  });
}


export const updateUCedula = async ({uid, ucedula})=>{
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {ucedula});

  return {uid,ucedula}
}

export const updatePhone = async ({uid, phoneNumber})=>{
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {phoneNumber});

  return {uid,phoneNumber}
}