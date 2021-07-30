import { db } from 'firebase/client'

export const getCategories = callBack =>{
    return db.collection('categories')
             .get()
             .then( ({ docs }) => {
                 const categories = docs.map( doc => {
                     return {...doc.data(), id:doc.id}
                 } )
                 callBack(categories)
             })
}