import { firestore } from "firebaseApi/admin"

export default async (req, res) => {
    const { query } = req
    const { uid } = query
    let bills = []

    const codeRef = firestore.collection('bill')
    const snapshot = await codeRef.where('uid', '==', uid).get()

    if (snapshot.empty) {
        return res.json([])
    }
      
    snapshot.forEach(doc => {
        let data = doc.data()
        bills.push({id : doc.id, ...data});
    });

    return res.json(bills)
}
