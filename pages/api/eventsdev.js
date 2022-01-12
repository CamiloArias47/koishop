import { firestore } from "firebaseApi/admin"
import sha256 from 'crypto-js/sha256';
import { SMTPClient } from 'emailjs';

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
    .then( (result) => {
      console.log({result})
      if(data.transaction.customer_email){ 
        sendMailToUser = sendMail({email: data.transaction.customer_email})
      }

      return response.status(200).json({succes:'paso validación', sendMailToUser})
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

function sendMail({email}){
  
  let sendEmail = 'no yet'

  const client = new SMTPClient({
    user: process.env.MAIL,
    password: process.env.PASSMAIL,
    host: 'smtp.gmail.com',
    ssl:true
  });
  
  try{
    client.send(
      {
        text: `Just for testing purpose`,
        from: process.env.MAIL,
        to: email,
        subject: 'testing emailjs',
       
      }
      )
      sendEmail = 'success'
    }
  catch(e){
    sendEmail = "Error"
  }
  
  return sendEmail
}