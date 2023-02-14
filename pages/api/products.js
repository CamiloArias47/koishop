import { firestore } from 'firebaseApi/admin'

export default (request, response) => {
  firestore
    .collectionGroup('products')
    .get()
    .then((res) => {
      const products = []
      res.forEach(prod => {
        products.push({ ...prod.data(), id: prod.id })
      })
      response.json(products)
    })
    .catch(() => {
      response.status(404).end()
    })
}
