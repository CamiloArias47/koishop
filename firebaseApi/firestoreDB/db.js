import { firebaseApp } from "firebaseApi/init";
import { getFirestore } from "firebase/firestore";

export default getFirestore(firebaseApp);