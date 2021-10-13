import db from './db'
import { getDocs,collection} from "firebase/firestore";

export const products = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    let products = []

    querySnapshot.forEach( doc => {
        products.push({...doc.data(), id:doc.id})
    });

    return products
}