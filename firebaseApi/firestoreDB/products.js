import db from './db'
import { doc, getDoc, getDocs,collection} from "firebase/firestore";

export const products = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    let products = []

    querySnapshot.forEach( doc => {
        products.push({...doc.data(), id:doc.id})
    });

    return products
}

export const getProduct = async id => {
    const proRef = doc(db, "products", id);
    const product = await getDoc(proRef);
    
    if (product.exists()) return { id, ...product.data() }
    return {}
}