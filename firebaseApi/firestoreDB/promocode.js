import db from './db'
import { doc, getDoc } from "firebase/firestore";

export const getCode = async ({cid}) => {
    const codRef = doc(db, "codes", cid);
    const docSnap = await getDoc(codRef);
    
    // doc.data() will be undefined if docSnap.exists() is false
    return docSnap.data() 
}