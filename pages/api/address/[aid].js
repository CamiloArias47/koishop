import { firestore } from "firebaseApi/admin"

export default async (req, res) => {
    const { query } = req
    const { aid } = query

    const codeRef = firestore.collection('address').doc(aid);
    const doc = await codeRef.get();

    if (!doc.exists) {
        res.json([])
    }
    else{
        const data = doc.data()
        res.json(data)
    }
}