import db from './db'
import {doc, collection, addDoc,
        updateDoc, serverTimestamp, 
        arrayUnion, query, where, getDocs, orderBy} from "firebase/firestore"


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
      usedby: arrayUnion({uid,bid})
    })
    return {codeUpdated:true}
  })

}

export const updateStatus = async ({bid, status, pricePayed=false}) => {
  const billRef = doc(db, "bill", bid);

  const data = (pricePayed) 
                ? {status, total:pricePayed}
                : {status}

  const response = await updateDoc(billRef, data);
  return {response}
}

export const getBillsByUser = async ({uid}) => {

  let bills = []
  
  const q = query(collection(db, "bill"),
                  where("uid", "==", uid),
                  orderBy("timestamp", "desc"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    bills.push({id: doc.id, ...doc.data()});
  });

  return bills
}

