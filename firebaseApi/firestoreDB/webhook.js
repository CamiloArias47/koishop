import db from './db'
import { query, collection, where, getDocs} from "firebase/firestore"

export async function getWebhook({id}){
    let webhook = {}
    const webhookCollection = collection(db, "webhooks")
    const q = query(webhookCollection, where('data.transaction.id','==', id) )
    const docs = await getDocs(q);

    docs.forEach( doc => webhook = doc.data() )
    return webhook
}