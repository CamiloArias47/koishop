import db from './db'
import { doc, getDoc} from "firebase/firestore";

export const getInstagramToken = async () => {
    const tokenRef = doc(db, "tokens", "instagram");
    const token = await getDoc(tokenRef);
    
    if ( token.exists() ) return { id:"instagram", ...token.data() }
    return {}
}