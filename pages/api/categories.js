import { firestore } from 'firebaseApi/admin'

export default (request, response) => {
  // const { query } = request
  // const { id } = query

  firestore
    .collection('categories')
    .get()
    .then(({ docs }) => {
      const categories = docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })

      response.json(categories)
    })
    .catch(() => {
      response.status(404).end()
    })
}
