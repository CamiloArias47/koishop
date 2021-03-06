import { firestore } from "firebaseApi/admin"
import { FieldValue } from 'firebase-admin'
import sha256 from 'crypto-js/sha256';
import sgMail from '@sendgrid/mail'
import mailOrderConfirmed from 'components/mails/order-confirmation'
import { handlerDiscount, centsToPesos } from 'components/CommerceContext'

const DEV = process.env.ENVIRONMENT === 'development' ? true : false

const WOPMPI_EVENTS = {
  transactionUpdate : 'transaction.updated',
  nequiTokenUpdate : 'nequi_token.updated'
}

const WOMPI_STATES = {
  ok : 'APPROVED',
  void: 'VOIDED',
  declined : 'DECLINED',
  fail: 'ERROR'
}

export default async (request, response) => {
  const { query, body } = request
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
  //     "id": "114028-1641953792-17900",
  //     "status": "APPROVED",
  //     "currency": "COP",
  //     "reference": "6phHHle2Qmq3qgfyB1Ho",
  //     "created_at": "2022-01-12T02:16:32.854Z",
  //     "billing_data": null,
  //     "finalized_at": "2022-01-12T02:16:33.000Z",
  //     "redirect_url": "https://koishop.vercel.app/success",
  //     "customer_data": {
  //       "legal_id": "11111111",
  //       "full_name": "ANDRES CAMILO ARIAS MARTINEZ",
  //       "phone_number": "+573991111111",
  //       "legal_id_type": "CC"
  //     },
  //     "customer_email": "andres.camilo.arias@correounivalle.edu.co",
  //     "payment_method": {
  //       "type": "NEQUI",
  //       "extra": {
  //         "transaction_id": "SANDBOX-1641953793Twbxsd",
  //         "external_identifier": "1641953793Y8o5lt"
  //       },
  //       "phone_number": "3991111111"
  //     },
  //     "status_message": null,
  //     "amount_in_cents": 2000000,
  //     "payment_link_id": null,
  //     "shipping_address": {
  //       "city": "Jamundi",
  //       "region": "Cauca",
  //       "country": "CO",
  //       "phone_number": "33333333",
  //       "address_line_1": "caloto 34"
  //     },
  //     "payment_source_id": null,
  //     "payment_method_type": "NEQUI"
  //   }
  // }
  // let event ="transaction.updated"
  // let environment = "test"
  // let signature = {
  //     "checksum": "ac238e5ef5d914cb98ea8a1bf674cf5f6e9a29112440714d6fea5284cbe2f88f",
  //     "properties": [
  //       "transaction.id",
  //       "transaction.status",
  //       "transaction.amount_in_cents"
  //     ]
  //   }
  // let timestamp = 1641953793 
  // let sent_at = "2022-01-12T02:16:33.091Z"

   const webhook = {
    event,
    data,
    environment,
    signature,
    timestamp,
    sent_at
  };

  let sendMailToUser = 'initial state'
  
  const res = await firestore.collection('webhooks').add(webhook);

  if(!res.id){
    response.status(500).json({error:'no se almaceno el webhook'})
    return
  }

  const amountInCents = data.transaction.amount_in_cents
  const totalInPesos = centsToPesos({amountInCents})

  const updateBillData = {
    event, 
    status : data.transaction.status, 
    reference : data.transaction.reference, 
    totalPaid : totalInPesos
  }

   validate({signature, data, timestamp}) 
    .then( (result) => updateBillStatus(updateBillData) )
    .then( async result => {
      if(result.status && data.transaction.customer_email){ 
        sendMailToUser = await sendMail({
          data, 
          billCode : result.billCode,
          products : result.prouctsdata,
          discount : result.aplyDiscount,
          subtotal : result.subtotal,
          totalInPesos
        })
      }

      return response.status(200).json({succes:result, sendMailToUser})
    })
    .catch( (e) => {
      return response.status(500).json({error:'Petici??n fraudulenta', message:e})
    })

}

function validate({signature,data,timestamp}){
  let concat = ''
  const secret = DEV ? process.env.WOMPISECRETTEST : process.env.WOMPISECRET

  return new Promise( (resolve, reject) => {

    signature.properties.map(prop => {
      let properties = prop.split('.')
      concat = concat+data[properties[0]][properties[1]]
    })

    concat = concat + timestamp + secret
    const hashDigest = sha256(concat).toString();

    if(signature.checksum === hashDigest){
      resolve(true)
    }
    else{
      const message = `env: ${DEV}, concat ${concat}, checksum: ${signature.checksum}, hasDigest: ${hashDigest}`
      reject(message)
    }

  })
}

async function updateBillStatus({event, status, reference, totalPaid}){

    if(event === WOPMPI_EVENTS.transactionUpdate || event === WOPMPI_EVENTS.nequiTokenUpdate){
      if(status === WOMPI_STATES.ok){

        const billRef = firestore.collection('bill').doc(reference);
        try {
          let prouctsdata = []
          let discountPromo = []
          let aplyDiscount = 0
          let subtotal = totalPaid
          let billCode = ''

          const res = await firestore.runTransaction(async t => {
            const bill = await t.get(billRef);
            const { products, discountCode, uid, code } = bill.data();
            let codeRef
            billCode = code

            if(discountCode){
              codeRef = firestore.collection('codes').doc(discountCode);
              discountPromo = await t.get(codeRef);
              subtotal = products.reduce( (acc, actual) => acc+actual.pricex1*actual.amount, 0)
              
              let {discountValue} = handlerDiscount({
                 type : discountPromo.data().type,
                 discount : discountPromo.data().value, 
                 total:subtotal
                })

              aplyDiscount = discountValue
            }

            let productsObjs =  products.map( async product => {
              let productRef = firestore.collection('products').doc(product.id);
              let productObj = await t.get(productRef);
              return {
                productObj: {...productObj.data()},
                productSell: product,
                amountBuy:product.amount,
                productRef
              }
            });

            return Promise.all(productsObjs)
                      .then( values => {
                        let updateCode
                        
                        const dataUpdateBill = (aplyDiscount) 
                                                ? { status, discount:aplyDiscount, total: totalPaid}
                                                : { status, total: totalPaid}
 
                        let updateStatus = t.update(billRef, dataUpdateBill)
                        
                        if(codeRef){
                          const discountPromoData = discountPromo.data()
                          const oldUsedBy = discountPromoData.usedby
                          
                          const newUsedBy = oldUsedBy 
                                              ? [...oldUsedBy, {uid:uid,bid:reference}]
                                              : [{uid:uid,bid:reference}]
      
                          updateCode = t.update(codeRef,{
                            usedby: newUsedBy
                          })
                        }
                    
                        let productsUpdates = values.map( data =>{
                            prouctsdata.push({
                              ...data.productObj, 
                              ...data.productSell
                            })

                            let newAmount = data.productObj.amount - data.amountBuy;
                            let update = t.update(data.productRef, { amount: newAmount });
                            
                            return update
                          })
                        
                        const updates = (updateCode) 
                                          ? [...productsUpdates, updateStatus, updateCode ]
                                          : [...productsUpdates, updateStatus ]

                        return updates
                      })
                      .then( arrayUpdates => Promise.all(arrayUpdates) )
          });
          return {status: true, msg:'documentos actualizados', prouctsdata, discountPromo, aplyDiscount, subtotal, billCode};
        } catch (e) {
          return {status: false, msg:'fallo actualizacion', e};
        }
        
      }
      else{
        let billReference = firestore.collection('bill').doc(reference);
        await billReference.update({status});
        return {status: false , msg:'transaci??n no aprobada status actualizado en firebase'}
      }
    }
    else{
      return {status: false, msg : 'evento Wompi desconocido'}
    }

}


function sendMail({data, billCode, products, discount, subtotal, totalInPesos}){
  
  sgMail.setApiKey(process.env.SENDGRID_APIKEY)
  
  const str = data.transaction.customer_data.full_name;
  const name = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const createMail = mailOrderConfirmed({
    reference: billCode || data.transaction.reference, 
    name, 
    date: data.transaction.finalized_at, 
    paymetod: data.transaction.payment_method.type, 
    department: data.transaction.shipping_address.region, 
    city : data.transaction.shipping_address.city, 
    address : data.transaction.shipping_address.address_line_1, 
    products, 
    total : totalInPesos, 
    envio:'$0', 
    discount,
    subtotal
  })

  const msg = {
    to: data.transaction.customer_email, 
    from: 'koimaquillaje@gmail.com', 
    subject: '??Hemos recibido tu pedido en Koi Makeup!',
    text: `Hola ${name} Hemos recibido tu pedido ${data.transaction.code || data.transaction.reference}, y ahora se est?? procesando, recuerda que el tiempo de llegada es de 1 semana despu??s del pago, 3-5 d??as h??biles de lunes a viernes sin contar s??bados, domingos ni festivos. Tan pronto el n??mero de guia para tu envio sea generado te lo enviarem??s para que puedas consultar el estado de tu env??o. ??Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo m??s pronto posible.`,
    html: createMail
  }

  const msg2 = {
    to: 'camillo47@gmail.com', 
    from: 'koimaquillaje@gmail.com', 
    subject: '??Hemos recibido tu pedido en Koi Makeup!',
    text: `Hola ${name} Hemos recibido tu pedido ${data.transaction.code || data.transaction.reference}, y ahora se est?? procesando, recuerda que el tiempo de llegada es de 1 semana despu??s del pago, 3-5 d??as h??biles de lunes a viernes sin contar s??bados, domingos ni festivos. Tan pronto el n??mero de guia para tu envio sea generado te lo enviarem??s para que puedas consultar el estado de tu env??o. ??Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo m??s pronto posible.`,
    html: createMail
  }

  let mailsSended = 0
  let mailsendedText = ''

  return executeSendMail(msg)
          .then( result => {
            mailsSended++
            mailsendedText = result+':'+mailsSended
            return executeSendMail(msg2)
            
          })
          .then( result => {
            mailsSended++
            mailsendedText = result+':'+mailsSended+', '+mailsendedText
            return mailsendedText
          })
          .catch((error) => {
            return {error, msg:'error al enviar mail'}
          })
    
}

function executeSendMail(msg){

  sgMail.setApiKey(process.env.SENDGRID_APIKEY)

  return sgMail
          .send(msg)
          .then(() => 'Email Sended' )
}