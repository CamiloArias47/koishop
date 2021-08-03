import { firestore } from "firebase/admin"

export default (request, response) => {
  //const { query } = request
  //const { id } = query

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