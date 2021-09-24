import { firebaseApp } from 'firebaseApi/init'
import { getFirestore, 
         getDocs,
         collection, 
         } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const getCategories = async () =>{
    const querySnapshot = await getDocs(collection(db, 'categories'))
    let categories = []
    querySnapshot.forEach( doc => {
        categories.push({...doc.data(), id:doc.id})
    })
    return categories
}