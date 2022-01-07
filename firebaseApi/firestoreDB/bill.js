import db from './db'
import {doc, collection, addDoc,
        updateDoc, serverTimestamp, 
        arrayUnion } from "firebase/firestore"


export const setBill = async ({uid, cart, status}) => {
    const docRef = await addDoc(collection(db, "bill"), {
      uid,
      products: cart,
      status,
      timestamp: serverTimestamp()
    });

    return {bid: docRef.id, uid, cart, status} 
}

export const updateBill = async ({bid, uid, cart, status})=>{
  const billRef = doc(db, "bill", bid);

  await updateDoc(billRef, {
    products: cart,
    status,
    uid,
    timestamp: serverTimestamp()
  });

  return {bid,cart,status}
}

export const updateBillWithPersonAndAddress = async ({bid, name, nationalIdentification, phone, aid})=>{
  const billRef = doc(db, "bill", bid);

  await updateDoc(billRef, {
    name,
    cedula: nationalIdentification,
    phone,
    address:aid,
    timestampEnvioStep: serverTimestamp()
  });

  return {bid,name,nationalIdentification,phone}
}

export const updateCodeUsedBy = async ({bid, uid, code}) => {
  const billRef = doc(db, "bill", bid);
  const codeRef = doc(db, "codes", code);

  return await updateDoc(billRef, {
    promocode: code
  })
  .then( () => {
     updateDoc(codeRef, {
      usedby: arrayUnion(uid)
    })
    return {codeUpdated:true}
  })

}

export const updateStatus = async ({bid, status}) => {
  const billRef = doc(db, "bill", bid);

  const response = await updateDoc(billRef, {status});
  return {response}
}

