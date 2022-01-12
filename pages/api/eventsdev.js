import { firestore } from "firebaseApi/admin"
import sha256 from 'crypto-js/sha256';

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

   //producción
   const webhook = {
    event,
    data,
    environment,
    signature,
    timestamp,
    sent_at
  };

  // desarrollo
  // const webhook = {
  //   "data": {
  //     "transaction": {
  //       "id": "114028-1641953792-17900",
  //       "status": "APPROVED",
  //       "currency": "COP",
  //       "reference": "NrnXe0gwXkUGpt2d7QFK",
  //       "created_at": "2022-01-12T02:16:32.854Z",
  //       "billing_data": null,
  //       "finalized_at": "2022-01-12T02:16:33.000Z",
  //       "redirect_url": "https://koishop.vercel.app/success",
  //       "customer_data": {
  //         "legal_id": "11111111",
  //         "full_name": "ANDRES CAMILO ARIAS MARTINEZ",
  //         "phone_number": "+573991111111",
  //         "legal_id_type": "CC"
  //       },
  //       "customer_email": "andres.camilo.arias@correounivalle.edu.co",
  //       "payment_method": {
  //         "type": "NEQUI",
  //         "extra": {
  //           "transaction_id": "SANDBOX-1641953793Twbxsd",
  //           "external_identifier": "1641953793Y8o5lt"
  //         },
  //         "phone_number": "3991111111"
  //       },
  //       "status_message": null,
  //       "amount_in_cents": 2000000,
  //       "payment_link_id": null,
  //       "shipping_address": {
  //         "city": "Jamundi",
  //         "region": "Cauca",
  //         "country": "CO",
  //         "phone_number": "33333333",
  //         "address_line_1": "caloto 34"
  //       },
  //       "payment_source_id": null,
  //       "payment_method_type": "NEQUI"
  //     }
  //   },
  //   "event": "transaction.updated",
  //   "sent_at": "2022-01-12T02:16:33.091Z",
  //   "signature": {
  //     "checksum": "ac238e5ef5d914cb98ea8a1bf674cf5f6e9a29112440714d6fea5284cbe2f88f",
  //     "properties": [
  //       "transaction.id",
  //       "transaction.status",
  //       "transaction.amount_in_cents"
  //     ]
  //   },
  //   "timestamp": 1641953793,
  //   "environment": "test"
  // }


  
  const res = await firestore.collection('webhooks').add(webhook);

  if(!res.id){
    response.status(500).json({error:'no se almaceno el webhook'})
    return
  }

  // validate({signature:webhook.signature, data:webhook.data, timestamp:webhook.timestamp}) //develop
  validate({signature, data, timestamp}) // pro
    .then( ()=>{
      response.status(200).json({succes:'paso validación'})
    })
    .catch( () => {
      response.status(500).json({error:'Petición fraudulenta'})
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

    if(concat === hashDigest){
      resolve(true)
    }
    else{
      reject(false)
    }

  })
}