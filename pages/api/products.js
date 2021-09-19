import { firestore } from "firebaseApi/admin"

export default (request, response) => {
  
  firestore
    .collectionGroup("products")
    .get()
    .then((res) => {
        let products = []
         res.forEach( prod => {
            products.push({...prod.data() , id:prod.id})
         })
        response.json(products)
    })
    .catch(error => {
      console.log({error})
      response.status(404).end()
    })
}