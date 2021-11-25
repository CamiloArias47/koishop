import db from './db'
import { getDocs,
         addDoc,
         collection,
         query,
         where 
         } from "firebase/firestore";

export const addresses = async () => {
    const querySnapshot = await getDocs(collection(db, "address"));
    let addresses = []

    querySnapshot.forEach( doc => {
        addresses.push({...doc.data(), id:doc.id})
    });

    return addresses
}

export const getAddressesBy = async uid => {
    const q = query(collection(db, "address"), where("uid", "==", uid) );
    let addresses = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        addresses.push({...doc.data(), id:doc.id})
    });
    return addresses
}

export const setAdrress = async ({address, addresscomplement, city, department, neighborhood, nextToAddress, uid}) => {
    const docRef = await addDoc(collection(db, "address"), {
        address,
        addresscomplement,
        city,
        department,
        neighborhood,
        nextToAddress,
        uid
    });

    return {aid: docRef.id} 
}