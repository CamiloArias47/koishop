import { firestore } from "firebaseApi/admin"
import sha256 from 'crypto-js/sha256';
import sgMail from '@sendgrid/mail'

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
  //     "reference": "NrnXe0gwXkUGpt2d7QFK",
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

   validate({signature, data, timestamp}) 
    .then( (result) => updateBillStatus({event, status:data.transaction.status, reference:data.transaction.reference}) )
    .then( result => {
      if(result.status && data.transaction.customer_email){ 
        sendMailToUser = sendMail({data})
      }

      return response.status(200).json({succes:result, sendMailToUser})
    })
    .catch( (e) => {
      console.log('fallo...')
      console.log({e})
      return response.status(500).json({error:'Petición fraudulenta', message:e})
    })

}

function validate({signature,data,timestamp}){
  let concat = ''
  const secret = process.env.WOMPISECRET

  return new Promise( (resolve, reject) => {

    signature.properties.map(prop => {
      let properties = prop.split('.')
      concat = concat+data[properties[0]][properties[1]]
    })

    concat = concat + timestamp + secret
    const hashDigest = sha256(concat).toString();

    console.log({hashDigest})
    console.log({checksum: signature.checksum})

    if(signature.checksum === hashDigest){
      console.log('son iguales')
      resolve(true)
    }
    else{
      console.log('estan mal')
      reject(false)
    }

  })
}

async function updateBillStatus({event, status, reference}){

    if(event === WOPMPI_EVENTS.transactionUpdate || event === WOPMPI_EVENTS.nequiTokenUpdate){
      if(status === WOMPI_STATES.ok){

        const billRef = firestore.collection('bill').doc(reference);
        try {
          const res = await firestore.runTransaction(async t => {
            const bill = await t.get(billRef);
            const products = bill.data().products;

            let productsObjs =  products.map( async product => {
              let productRef = firestore.collection('products').doc(product.id);
              let productObj = await t.get(productRef);
              return {
                productObj: {...productObj.data()},
                amountBuy:product.amount,
                productRef
              }
            });

            return Promise.all(productsObjs)
                      .then( values => {

                        let updateStatus = t.update(billRef, { status })

                        let updates = values.map( data =>{
                              let newAmount = data.productObj.amount - data.amountBuy;
                              let update = t.update(data.productRef, { amount: newAmount });
                              return update
                            })
                        return [...updates, updateStatus]
                      })
                      .then( arrayUpdates => Promise.all(arrayUpdates) )
          });
          return {status: true, msg:'documentos actualizados'};
        } catch (e) {
          return {status: false, msg:'fallo actualizacion', e};
        }
        
      }
      else{
        let billReference = firestore.collection('bill').doc(reference);
        await billReference.update({status});
        return {status: false , msg:'transación no aprobada status actualizado en firebase'}
      }
    }
    else{
      return {status: false, msg : 'evento Wompi desconocido'}
    }

}


async function sendMail({data}){
  
  sgMail.setApiKey(process.env.SENDGRID_APIKEY)
  
  const str = data.transaction.customer_data.full_name;
  const name = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const msg = {
    to: data.transaction.customer_email, // Change to your recipient
    from: 'koimaquillaje@gmail.com', // Change to your verified sender
    subject: '¡Hemos recibido tu pedido en Koi Makeup!',
    text: `Hola ${name} Hemos recibido tu pedido ${data.transaction.reference}, y ahora se está procesando, recuerda que el tiempo de llegada es de 1 semana después del pago, 3-5 días hábiles de lunes a viernes sin contar sábados, domingos ni festivos. Tan pronto el número de guia para tu envio sea generado te lo enviaremós para que puedas consultar el estado de tu envío. ¡Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo más pronto posible.`,
    html: `<h1>Hola ${name}</h1><br/>
           Hemos recibido tu pedido <b>${data.transaction.reference}</b>, y ahora se está procesando, recuerda que el tiempo de llegada es de 1 semana después del pago, 3-5 días hábiles de lunes a viernes sin contar sábados, domingos ni festivos.<br/> Tan pronto el número de guia para tu envio sea generado te lo enviaremós para que puedas consultar el estado de tu envío.<br/> <b>¡Gracias por confiar en nosotros! Estamos trabajando para cumplirte lo más pronto posible.</b>`,
  }

  return sgMail
    .send(msg)
    .then(() => {
      return 'Email Sended'
    })
    .catch((error) => {
      return {error, msg:'error al enviar mail'}
    })
    
}