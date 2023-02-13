import { saveTestingProduct, saveTestUser, deleteTestingData, createTestUser, deleteTestUser } from 'firebaseApi/firestoreADMIN/testing'
import { ENVIROMENTS } from 'utils'

export default async (request, response) => {
  if (process.env.ENVIRONMENT === ENVIROMENTS.dev) {
    const { method } = request

    if (method === 'POST') {
      try {
        const productId = await saveTestingProduct()
        const user = await createTestUser()
        saveTestUser()
        return response.status(200).json({ id: productId, user })
      } catch (e) {
        if (e?.errorInfo?.code === 'auth/uid-already-exists') {
          return response.status(200).json({ msg: 'user exist' })
        }
      }
    }

    if (method === 'DELETE') {
      try {
        const deleteResult = await deleteTestingData()
        const deleteuser = await deleteTestUser()
        return response.status(200).json({ ...deleteResult, ...deleteuser })
      } catch (e) {
        if (e?.errorInfo?.code === 'auth/user-not-found') {
          return response.status(200).json({ msg: 'user not exist' })
        }
      }
    }
  } else {
    return response.status(418).json({ msg: 'Not allowed' })
  }
}
