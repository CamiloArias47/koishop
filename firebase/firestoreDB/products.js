import { db } from 'firebase/client'

export const products = cb => {
    return db.collection('products')
             .get()
             .then( ({docs}) => {
                 const products = docs.map( prod => {
                     return {...prod.data(), id:prod.id}
                 }) 
                 cb(products)
             })
}