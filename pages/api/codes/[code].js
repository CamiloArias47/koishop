import { firestore } from "firebaseApi/admin"

export default async (request, response) => {
  const { query, body } = request
  const { code } = query 
  const { uid } = body

  const codeRef = firestore.collection('codes').doc(code);
  const doc = await codeRef.get();
  if (!doc.exists) {
      response.json({exist:false})
  } else {
      const data = doc.data()

      validate(data, uid)
        .then( () => {
          let motive = "¡Exelente, tienes un descuento!"

          if(data.type === "free-delivery")
            motive = "¡Tú envío sera gratis!"
            
          if(data.type === "value discount")
            motive = `¡Exelente, tienes un descuento de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(data.value)}!`

          if(data.type === "percent discount")
            motive = `¡Exelente, tienes ${data.value}% de descuento!`
         
          const res = {...data, exist: true, status: true, motive }
          response.json(res)
        })
        .catch( fail => {
          const res = {...data, exist: true, status: false, motive: fail.motive}
          response.json(res)
        })
  }
}

function validate(code, uid){

  const validateUses = new Promise( (resolve, reject) => {
    if(code.uses > 0 && code.used >= code.uses){
      reject({status:false, motive:'El código ya no esta disponible'})
    }
    resolve(true)
  })

  const validateDate = new Promise((resolve, reject)=>{
    const now = new Date()
    const until = code.duration.toDate()
    //const untilR = new Date(new Date(until).setHours(until.getHours() - 5));
    
    if(now.getTime() > until.getTime()){
        reject({status:false, motive:'El código ya ha vencido'})
    }

    resolve(true)
  })

  const validateReUse = new Promise( (resolve, reject) => {
     //si el codigo no se puede reusar, validamos que el usuario no lo haya usado ya
     if(!code.reuse && code.usedby){
      const usedbyUser = code.usedby.find(u => u === uid) 
      if(usedbyUser){
        reject({status:false, motive:'Este código no se puede usar más de una vez'})
      }
    }
    resolve(true)
  })

  return validateUses
    .then( () => validateDate)
    .then( () => validateReUse )
}