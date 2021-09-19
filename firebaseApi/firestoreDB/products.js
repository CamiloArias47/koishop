import { firebaseApp } from 'firebaseApi/init'
import { getFirestore, 
         getDocs,
         collection, 
         } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const products = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    let products = []

    querySnapshot.forEach( doc => {
        products.push({...doc.data(), id:doc.id})
    });

    return products
}