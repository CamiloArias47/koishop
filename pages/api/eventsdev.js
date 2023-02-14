import { firestore } from 'firebaseApi/admin'
import sha256 from 'crypto-js/sha256'
import sgMail from '@sendgrid/mail'
import mailOrderConfirmed from 'components/mails/order-confirmation'
import { handlerDiscount, centsToPesos } from 'components/CommerceContext'

const DEV = process.env.ENVIRONMENT === 'development'

const WOPMPI_EVENTS = {
  transactionUpdate: 'transaction.updated',
  nequiTokenUpdate: 'nequi_token.updated'
}

const WOMPI_STATES = {
  ok: 'APPROVED',
  void: 'VOIDED',
  declined: 'DECLINED',
  fail: 'ERROR',
  pending: 'PENDING'
}

export default async (request, response) => {
  const { body } = request
  /* eslint camelcase: ["error", {ignoreDestructuring: true}] */
  const {
    event,
    data,
    environment,
    signature,
    timestamp,
    sent_at
  } = body

  // let data = {
  //   "transaction": {
  //     "id": "114028-1663460994-26487",
  //     "status": "APPROVED",
  //     "currency": "COP",
  //     "reference": "HLO1odhWpt8Yxhs1lWl6",
  //     "created_at": "2022-09-18T00:29:54.961Z",
  //     "billing_data": null,
  //     "finalized_at": "2022-09-18T00:29:55.277Z",
  //     "redirect_url": "https://koimakeup.com/user/pedidos/success",
  //     "customer_data": {
  //       "legal_id": "1143850015",
  //       "full_name": "Camilo Arias",
  //       "phone_number": "3188492936",
  //       "legal_id_type": "CC"
  //     },
  //     "customer_email": "camillo47@gmail.com",
  //     "payment_method": {
  //       "type": "NEQUI",
  //       "extra": {
  //         "transaction_id": "SANDBOX-1663460995yiOMjS",
  //         "external_identifier": "1663460995RvTZY3"
  //       },
  //       "phone_number": "3991111111"
  //     },
  //     "status_message": null,
  //     "amount_in_cents": 10850000,
  //     "payment_link_id": null,
  //     "shipping_address": {
  //       "city": "Cali",
  //       "region": "Valle del Cauca",
  //       "country": "CO",
  //       "phone_number": "3188492936",
  //       "address_line_1": "av 7b oeste #19-142"
  //     },
  //     "payment_source_id": null,
  //     "payment_method_type": "NEQUI"
  //   }
  // }
  // let event ="transaction.updated"
  // let environment = "test"
  // let signature = {
  //   "checksum": "cd1c4ebd16db2e38c13a43e5183b83b2916a1ac0e92456744ded37a0b9cb2ea7",
  //   "properties": [
  //     "transaction.id",
  //     "transaction.status",
  //     "transaction.amount_in_cents"
  //   ]
  // }
  // let timestamp = 1663460995
  // let sent_at = "2022-09-18T00:29:55.326Z"

  const webhook = {
    event,
    data,
    environment,
    signature,
    timestamp,
    // eslint-disable-next-line camelcase
    sent_at
  }

  let sendMailToUser = 'initial state'

  const amountInCents = data.transaction.amount_in_cents
  const totalInPesos = centsToPesos({ amountInCents })

  const updateBillData = {
    event,
    status: data.transaction.status,
    reference: data.transaction.reference,
    totalPaid: totalInPesos
  }

  firestore.collection('webhooks').doc(data.transaction.id).set(webhook)
    .then(() => validate({ signature, data, timestamp }))
    .then(() => updateBillStatus(updateBillData))
    .then(async result => {
      if (result.status && data.transaction.customer_email) {
        sendMailToUser = await sendMail({
          data,
          billCode: result.billCode,
          products: result.prouctsdata,
          discount: result.aplyDiscount,
          subtotal: result.subtotal,
          totalInPesos
        })
      }

      return response.status(200).json({ succes: result, sendMailToUser })
    })
    .catch(err => {
      return response.status(500).json({ err })
    })
}

function validate ({ signature, data, timestamp }) {
  let concat = ''
  const secret = DEV ? process.env.WOMPISECRETTEST : process.env.WOMPISECRET

  return new Promise((resolve, reject) => {
    signature.properties.forEach(prop => {
      const properties = prop.split('.')
      concat = concat + data[properties[0]][properties[1]]
    })

    concat = concat + timestamp + secret
    const hashDigest = sha256(concat).toString()

    if (signature.checksum === hashDigest) {
      resolve(true)
    } else {
      const message = `Petición fraudulenta = env: ${DEV}, concat ${concat}, checksum: ${signature.checksum}, hasDigest: ${hashDigest}`
      reject(message)
    }
  })
}

async function updateBillStatus ({ event, status, reference, totalPaid }) {
  if (event === WOPMPI_EVENTS.transactionUpdate || event === WOPMPI_EVENTS.nequiTokenUpdate) {
    if (status === WOMPI_STATES.ok) {
      const billRef = firestore.collection('bill').doc(reference)
      try {
        const prouctsdata = []
        let discountPromo = []
        let aplyDiscount = 0
        let subtotal = totalPaid
        let billCode = ''

        await firestore.runTransaction(async t => {
          const bill = await t.get(billRef)
          const { products, promocode, uid, code } = bill.data()
          let codeRef
          billCode = code

          if (promocode) {
            codeRef = firestore.collection('codes').doc(promocode)
            discountPromo = await t.get(codeRef)
            subtotal = products.reduce((priceAcumulator, currentProduct) => priceAcumulator + currentProduct.pricex1 * currentProduct.amount, 0)
            const { type, value } = discountPromo.data()

            const { discountValue } = handlerDiscount({
              type,
              discount: value,
              total: subtotal
            })

            aplyDiscount = discountValue
          }

          const productsObjs = products.map(async product => {
            const productRef = firestore.collection('products').doc(product.id)
            const productObj = await t.get(productRef)
            return {
              productObj: { ...productObj.data() },
              productSell: product,
              amountBuy: product.amount,
              productRef
            }
          })

          return Promise.all(productsObjs)
            .then(values => {
              let updateCode

              const dataUpdateBill = (aplyDiscount)
                ? { status, discount: aplyDiscount, total: totalPaid }
                : { status, total: totalPaid }

              const updateStatus = t.update(billRef, dataUpdateBill)

              if (codeRef) {
                const discountPromoData = discountPromo.data()
                const oldUsedBy = discountPromoData.usedby

                const newUsedBy = oldUsedBy
                  ? [...oldUsedBy, { uid, bid: reference }]
                  : [{ uid, bid: reference }]
                updateCode = t.update(codeRef, {
                  usedby: newUsedBy,
                  used: discountPromoData.used + 1
                })
              }

              const productsUpdates = values.map(data => {
                prouctsdata.push({
                  ...data.productObj,
                  ...data.productSell
                })

                const newAmount = data.productObj.amount - data.amountBuy
                const updateData = { amount: newAmount }

                if (data.productSell.color !== '') {
                  const productColors = data.productObj.colors.map(colors => JSON.parse(colors))
                  const colorBuyedIndex = productColors.findIndex(color => color.name === data.productSell.color)

                  const colorBuyedData = productColors[colorBuyedIndex]
                  const newColorAmount = colorBuyedData.amount - data.amountBuy
                  colorBuyedData.amount = newColorAmount
                  productColors[colorBuyedIndex] = colorBuyedData
                  const newColors = productColors.map(color => JSON.stringify(color))
                  updateData.colors = newColors
                }

                const update = t.update(data.productRef, updateData)

                return update
              })

              const updates = (updateCode)
                ? [...productsUpdates, updateStatus, updateCode]
                : [...productsUpdates, updateStatus]

              return updates
            })
            .then(arrayUpdates => Promise.all(arrayUpdates))
        })
        return { status: true, msg: 'documentos actualizados', prouctsdata, discountPromo, aplyDiscount, subtotal, billCode }
      } catch (e) {
        console.log({ e })
        return { status: false, msg: 'fallo actualizacion', e }
      }
    } else {
      const billReference = firestore.collection('bill').doc(reference)
      let billData = await billReference.get()
      if (billData.exists) {
        billData = billData.data()
        const updateData = { status }

        await billReference.update(updateData)
        const msg = 'transación no aprobada, status actualizado en firebase'
        return { status: false, msg }
      }
      return { status: false, msg: 'transación no aprobada, bill no encontrado, no actualizado' }
    }
  } else {
    return { status: false, msg: 'evento Wompi desconocido' }
  }
}

function sendMail ({ data, billCode, products, discount, subtotal, totalInPesos }) {
  sgMail.setApiKey(process.env.SENDGRID_APIKEY)

  const str = data.transaction.customer_data.full_name
  const name = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  const createMail = mailOrderConfirmed({
    reference: billCode || data.transaction.reference,
    name,
    date: data.transaction.finalized_at,
    paymetod: data.transaction.payment_method.type,
    department: data.transaction.shipping_address.region,
    city: data.transaction.shipping_address.city,
    address: data.transaction.shipping_address.address_line_1,
    products,
    total: totalInPesos,
    envio: '$0',
    discount,
    subtotal
  })

  const msg = {
    to: data.transaction.customer_email,
    from: 'koimaquillaje@gmail.com',
    subject: '¡Hemos recibido tu pedido en Koi Makeup!',
    text: `Hola ${name} Hemos recibido tu pedido ${data.transaction.code || data.transaction.reference}, y ahora se está procesando, recuerda que el tiempo de llegada es de 1 semana después del pago, 3-5 días hábiles de lunes a viernes sin contar sábados, domingos ni festivos. Tan pronto el número de guia para tu envio sea generado te lo enviaremós para que puedas consultar el estado de tu envío. ¡Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo más pronto posible.`,
    html: createMail
  }

  const msg2 = {
    to: 'camillo47@gmail.com',
    from: 'koimaquillaje@gmail.com',
    subject: '¡Hemos recibido tu pedido en Koi Makeup!',
    text: `Hola ${name} Hemos recibido tu pedido ${data.transaction.code || data.transaction.reference}, y ahora se está procesando, recuerda que el tiempo de llegada es de 1 semana después del pago, 3-5 días hábiles de lunes a viernes sin contar sábados, domingos ni festivos. Tan pronto el número de guia para tu envio sea generado te lo enviaremós para que puedas consultar el estado de tu envío. ¡Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo más pronto posible.`,
    html: createMail
  }

  let mailsSended = 0
  let mailsendedText = ''

  return executeSendMail(msg)
    .then(result => {
      mailsSended++
      mailsendedText = result + ':' + mailsSended
      return executeSendMail(msg2)
    })
    .then(result => {
      mailsSended++
      mailsendedText = result + ':' + mailsSended + ', ' + mailsendedText
      return mailsendedText
    })
    .catch((error) => {
      return { error, msg: 'error al enviar mail' }
    })
}

function executeSendMail (msg) {
  sgMail.setApiKey(process.env.SENDGRID_APIKEY)

  return sgMail
    .send(msg)
    .then(() => 'Email Sended')
}
