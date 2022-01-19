import { useState } from 'react'
import { getSecondPage } from 'firebaseApi/firestoreDB/productsPaginator'

export default function useGetCategoryProducts({cid, startAt, subCat, firstProducts}){
    let lastPtoStart = typeof startAt === 'string' 
                      ? new Date(startAt)
                      : startAt 

    const [ productsAsked, setProductsAsked ] = useState(1)
    const [ productsState, setProducts ] = useState( firstProducts )
    const [ lastProduct, setLastProduct ] = useState( lastPtoStart )

    function paginate({getFromStart, categoria = cid}){

        const config = { 
            category: categoria, 
            startPageAt: lastProduct, 
            isSub : subCat,
            firstReq : productsAsked === 1 || getFromStart ? true : false,
            getFromStart
        }
    
        getSecondPage(config)
          .then( nextProducts => {
            if(nextProducts.products.length > 0){

              const updateProducts = getFromStart 
                                      ? [...nextProducts.products]
                                      : [...productsState, ...nextProducts.products ]

              setProducts(updateProducts)
              const lastp = nextProducts.lastVisible
              setLastProduct( lastp )
            }
            else{
              if(getFromStart){
                setProducts( [] )
              } 
            }
          })
    
        setProductsAsked( productsAsked + 1 )
    }

    return {productsState, paginate, lastProduct}
}
