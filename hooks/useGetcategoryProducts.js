import { useState } from 'react'
import { getSecondPage } from 'firebaseApi/firestoreDB/productsPaginator'

export default function useGetCategoryProducts({cid, startAt, subCat, firstProducts}){

    let lastPtoStart = typeof startAt === 'string' 
                      ? new Date(startAt)
                      : startAt 

    const [ productsAsked, setProductsAsked ] = useState(1)
    const [ productsState, setProducts ] = useState( firstProducts )
    const [ lastProduct, setLastProduct ] = useState( lastPtoStart )

    function paginate({getFromStart}){

        const config = { 
            category: cid, 
            startPageAt: lastProduct, 
            isSub : subCat,
            firstReq : productsAsked === 1 ? true : false,
            getFromStart
        }
    
        getSecondPage(config)
          .then( nextProducts => {
            if(nextProducts.products.length > 0){
              setProducts([ ...productsState, ...nextProducts.products ])
              const lastp = nextProducts.lastVisible
              setLastProduct( lastp )
            }
          })
    
        setProductsAsked( productsAsked + 1 )
    }

    function clearProducts(){
        setProducts([])
    }

    return {productsState, paginate, lastProduct, clearProducts}
}
