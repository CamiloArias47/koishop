import db from './db'
import { arrayUnion, doc, increment , getDoc, updateDoc } from "firebase/firestore";

export const getCode = async ({cid}) => {
    const codRef = doc(db, "codes", cid);
    const docSnap = await getDoc(codRef);
    
    // doc.data() will be undefined if docSnap.exists() is false
    return docSnap.data() 
}

export const addPromoCodeUsedBy = async ({bid, uid, code}) => {
    const codeRef = doc(db, "codes", code);
  
    await updateDoc(codeRef, {
        usedby: arrayUnion({uid,bid}),
        used: increment(1)
    })
    
    return {codeUpdated:true}
  }