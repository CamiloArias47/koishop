import db from './db'
import {doc, collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore"


export const setBill = async ({uid, cart, status}) => {
    const docRef = await addDoc(collection(db, "bill"), {
      uid,
      products: cart,
      status,
      timestamp: serverTimestamp()
    });

    return {bid: docRef.id, uid, cart, status} 
}

export const updateBill = async ({bid, cart, status})=>{
  const billRef = doc(db, "bill", bid);

  await updateDoc(billRef, {
    products: cart,
    status,
    timestamp: serverTimestamp()
  });

  return {bid,cart,status}
}

export const updateBillWithPerson = async ({bid, name, nationalIdentification, phone})=>{
  const billRef = doc(db, "bill", bid);

  await updateDoc(billRef, {
    name,
    cedula: nationalIdentification,
    phone,
    timestampEnvioStep: serverTimestamp()
  });

  return {bid,name,nationalIdentification,phone}
}