import db from './db'
import {doc, collection, addDoc, updateDoc } from "firebase/firestore"


export const setBill = async ({uid, cart, status}) => {
    const docRef = await addDoc(collection(db, "bill"), {
      uid,
      products: cart,
      status
    });

    return {bid: docRef.id, uid, cart, status} 
}

export const updateBill = async ({bid, cart, status})=>{
  const billRef = doc(db, "bill", bid);

  await updateDoc(billRef, {
    products: cart,
    status
  });

  return {bid,cart,status}
}