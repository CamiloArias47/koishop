import { firestore } from "firebaseApi/admin"
import { replaceAll } from "utils"

export default (request, response) => {
  const { query } = request
  const { name } = query
  name = replaceAll(name, '-', ' ')
  console.log({name})
  firestore
    .collection("products")
    .where('name','==',name)
    .get()
    .then((QuerySnapshot) => {
        let product = {}
        QuerySnapshot.forEach((doc) => {
            product = {id: doc.id, ...doc.data()}
        });
        response.json(product)
    })
    .catch(error => {
        console.log({error})
        response.status(404).end()
    })
}