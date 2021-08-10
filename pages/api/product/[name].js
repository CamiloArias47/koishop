import { firestore } from "firebase/admin"

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

export default (request, response) => {
  const { query } = request
  const { name } = query
  name = replaceAll(name, '-', ' ')
  
  firestore
    .collectionGroup("products")
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