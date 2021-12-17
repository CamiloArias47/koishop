import { firestore } from "firebaseApi/admin"

export default async (request, response) => {
  const { query } = request
  const { code } = query 

  const codeRef = firestore.collection('codes').doc(code);
  const doc = await codeRef.get();
  if (!doc.exists) {
      console.log('No such document! :(');
      response.json({exist:false})
  } else {
      console.log('Document data:', doc.data());
      const data = doc.data()
      const validation = validate(data)
      if(!validation.status){
          const res = {...data, exist: true, status: false, motive: validation.motive}
          response.json(res)
      }
      else{
          let motive = "¡Exelente, tienes un descuento!"

          if(data.type === "free-delivery")
            motive = "¡Tú envío sera gratis!"
            
          if(data.type === "value discount")
            motive = `¡Exelente, tienes un descuento de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(data.value)}!`

          if(data.type === "percent discount")
            motive = `¡Exelente, tienes ${data.value} de descuento!`
         
         const res = {...data, exist: true, status: true, motive }
         response.json(res)
      }
  }
}

function validate(code){

    if(code.uses > 0 && code.used >= code.uses) return false 
    const now = new Date()
    const until = code.duration.toDate()
    //const untilR = new Date(new Date(until).setHours(until.getHours() - 5));

    console.log({until})
    console.log({now})
    
    if(now.getTime() > until.getTime()){
        return {status:false, motive:'El código ya ha vencido'}
    }

    if(!code.reuse){
        console.log('validar que no haya usado el codigo antes')
        //puede ser actualizando el documento del codigo con un campo donde se guarden los 
        //ids de los usuarios que lo han usado
    }


    return {status:true}
}