import db from './db'
import { query, collection, where, getDocs, doc, onSnapshot } from "firebase/firestore"

export async function getWebhook({id}){
    let webhook = {}
    const webhookCollection = collection(db, "webhooks")
    const q = query(webhookCollection, where('data.transaction.id','==', id) )
    const docs = await getDocs(q);

    docs.forEach( doc => webhook = {'id':doc.id, ...doc.data()} )
    return webhook
}

export function watchWebhook(id, cb){
    return onSnapshot(doc(db, "webhooks", id), (doc) => {
        cb({'id':doc.id, ...doc.data()});
    });
}