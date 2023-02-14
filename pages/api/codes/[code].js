import { firestore } from 'firebaseApi/admin'

export default async (request, response) => {
  const { query, body } = request
  const { code } = query
  const { uid, priceToPay, bid } = body

  const codeRef = firestore.collection('codes').doc(code)
  const doc = await codeRef.get()
  if (doc.exists) {
    const data = { id: doc.id, ...doc.data() }

    const validateData = {
      code: data,
      uid,
      priceToPay,
      bid
    }

    validate(validateData)
      .then(() => {
        let motive = '¡Exelente, tienes un descuento!'

        if (data.type === 'free-delivery') { motive = '¡Tú envío sera gratis!' }

        if (data.type === 'value discount') { motive = `¡Exelente, tienes un descuento de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(data.value)}!` }

        if (data.type === 'percent discount') { motive = `¡Exelente, tienes ${data.value}% de descuento!` }

        const res = { ...data, exist: true, status: true, motive }
        response.json(res)
      })
      .catch(fail => {
        const res = { ...data, exist: true, status: false, motive: fail.cause }
        response.json(res)
      })
  } else {
    response.json({ exist: false })
  }
}

function validate ({ code, uid, priceToPay, bid }) {
  const validateUses = new Promise((resolve, reject) => {
    if (code.uses > 0 && code.used >= code.uses) {
      reject(new Error('No code available', { cause: 'El código ya no esta disponible' }))
    }
    resolve(true)
  })

  const validateDate = new Promise((resolve, reject) => {
    const now = new Date()
    const until = code.duration.toDate()
    if (now.getTime() > until.getTime()) {
      reject(new Error('code expired', { cause: 'El código ya ha vencido' }))
    }

    resolve(true)
  })

  const validateMinBuy = new Promise((resolve, reject) => {
    if (priceToPay < code.minbuy) {
      const format = { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0 }
      const minBuyValue = new Intl.NumberFormat('es-CO', format).format(code.minbuy)
      const cause = `El valor de la compra debe ser mayor a: ${minBuyValue}`
      reject(new Error('min buy', { cause }))
    }
    resolve(true)
  })

  const validateReUse = async () => {
    // si el codigo no se puede reusar, validamos que el usuario no lo haya usado ya
    if (!code.reuse) {
      if (code.usedby) {
        const usedbyUser = code.usedby.find(u => u.uid === uid)
        if (usedbyUser) {
          throw new Error('code used', { cause: 'Este código no se puede usar más de una vez' })
        }
      }

      const billRef = firestore.collection('bill')
      const billsResults = await billRef
        .where('uid', '==', uid)
        .where('promocode', '==', code.id)
        .get()

      if (!billsResults.empty) {
        if (billsResults.size > 1) {
          throw new Error('code used yet', { cause: 'Este código ya se aplicó más de una vez' })
        }

        if (billsResults.size === 1) {
          billsResults.forEach(bill => {
            if (bill.id !== bid) throw new Error('code used in other checkout', { cause: 'Este código ya se aplicó en otra compra' })
          })
        }
      }
    }
    return true
  }

  return validateUses
    .then(() => validateDate)
    .then(() => validateMinBuy)
    .then(() => validateReUse())
}
