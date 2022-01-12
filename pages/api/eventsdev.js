import { firestore } from "firebaseApi/admin"

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

   const webhook = {
    event,
    data,
    environment,
    signature,
    timestamp,
    sent_at
  };
  
  const res = await firestore.collection('webhooks').add(webhook);

  // if(!res.ok){
  //   res.status(500).json({})
  //   return
  // }

  response.status(200).json({res})
}

function validate({signature,data}){
  return new Promise( (resolve, reject) => {

  })
}