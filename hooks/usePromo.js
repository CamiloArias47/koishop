/**
 * Este hook no esta terminado y no se usa para validar el codigo, preferi hacer un endpoint para validar el codigo
 * y no quede del lado del cliente la validación del codigo, este hook puede servir para validar codigos pero no 
 * a la hora de pagar
 */
import {getCode} from 'firebaseApi/firestoreDB/promocode'
import {getBillsByUserAndPromoCode} from 'firebaseApi/firestoreDB/bill'

export function usePromo(){

    const validatePromoCode = async ({cid, priceToPay}) =>{
        const code = await getCode({cid})
        
        if(code){

            const {
                duration, 
                minbuy,
                reuse,
                usedby
            } = code

            validateUses({code})
                .then( () => validateDate({duration}) )
                .then( () => validateMinBuy({priceToPay, minbuy}))
                .then( () => validateReUse({reuse, usedby}) )
        }
    }

    //Validar si se acabaron los codigos
    function validateUses({code}){
        return new Promise( (resolve, reject) => {
            if(code.uses > 0 && code.used >= code.uses){
              reject({status:false, motive:'El código ya no esta disponible'})
            }
            resolve(true)
        })
    } 

    //validar si el codigo ya vencion (paso la fecha para su uso)
    function validateDate({duration}){
        return new Promise((resolve, reject)=>{
            const now = new Date()
            const until = duration.toDate()
            //const untilR = new Date(new Date(until).setHours(until.getHours() - 5));
            
            if(now.getTime() > until.getTime()){
                reject({status:false, motive:'El código ya ha vencido'})
            }
        
            resolve(true)
        })
    } 

    //validar el minimo de compra permitido para el codigo
    function validateMinBuy({priceToPay, minbuy}){
        return new Promise( (resolve, reject) => {
            if(priceToPay < minbuy){
              reject({status:false, motive:`El valor de la compra debe ser mayor a: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(minbuy)} `})
            }
            resolve(true)
          })
    }

    //validar si se puede reusar el codigo
    function validateReUse({reuse, usedby, uid}){
        return new Promise( (resolve, reject) => {
            //si el codigo no se puede reusar, validamos que el usuario no lo haya usado ya
            if(!reuse && usedby){
             const usedbyUser = usedby.find(u => u.uid === uid) 
             if(usedbyUser){
               reject({status:false, motive:'Este código no se puede usar más de una vez'})
             }
           }
           resolve(true)
         })
    }

    const validateSimultaneousUses = async ({cid, uid}) => {
        const code = await getCode({cid})

        const dataReuse = {
            reuse : code.reuse,
            usedby : code.usedby,
            uid
        }

        return validateReUse(dataReuse)
    }

    return{
        validatePromoCode,
        validateSimultaneousUses
    }
}