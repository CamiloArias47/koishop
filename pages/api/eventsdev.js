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
  
  const res = await db.collection('cities').add(webhook);
  
  if(!res.ok){
    res.status(500).json({})
    return
  }

  res.status(200).json({})
}

function validate({signature,data}){
  return new Promise( (resolve, reject) => {

  })
}