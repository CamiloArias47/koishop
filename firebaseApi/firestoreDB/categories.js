import  db  from './db'
import { getDocs, collection } from "firebase/firestore";

export const getCategories = async () =>{
    const querySnapshot = await getDocs(collection(db, 'categories'))
    let categories = []
    querySnapshot.forEach( doc => {
        categories.push({...doc.data(), id:doc.id})
    })
    return categories
}