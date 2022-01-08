import { firestore } from "firebaseApi/admin"

export default async (req, res) => {
    const { query } = req
    const { bid } = query

    const codeRef = firestore.collection('bill').doc(bid);
    const doc = await codeRef.get();

    if (!doc.exists) {
        res.json({exist:false})
    }
    else{
        const data = doc.data()
        res.json({exist:true,data})
    }
}