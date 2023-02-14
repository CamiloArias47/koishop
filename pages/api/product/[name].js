import { firestore } from 'firebaseApi/admin'
import { replaceAll } from 'utils'

export default (request, response) => {
  const { query } = request
  let { name } = query
  name = replaceAll(name, '-', ' ')
  firestore
    .collection('products')
    .where('name', '==', name)
    .get()
    .then((QuerySnapshot) => {
      let product = {}
      QuerySnapshot.forEach((doc) => {
        product = { id: doc.id, ...doc.data() }
      })
      response.json(product)
    })
    .catch(() => {
      response.status(404).end()
    })
}
