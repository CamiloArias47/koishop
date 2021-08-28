import React, { useCallback, useMemo }  from 'react'

const initialState = {
    categories : [],
    cart:[]
}

export const CoomerceContext = React.createContext(initialState)
CoomerceContext.displayName = CoomerceContext

function commerceReducer(state, action){
    switch(action.type){
        case 'set-categories' : {
            return {
                ...state,
                categories : action.payload
            }
        }
        case 'set-products-cart' : {
            return {
                ...state,
                cart : action.payload
            }
        }
        case 'set-product-cart' : {
            let {id} = action.payload
            let productsInCart = state.cart
            let exist = state.cart.find( product => product.id === id)
            if(exist) productsInCart = productsInCart.filter(product => product.id !== id)

            return {
                ...state,
                cart : productsInCart.concat(action.payload)
            }
        }
    }
}

export const CommerceProvider = ({...props}) =>{
    const [ state, dispatch ] = React.useReducer(commerceReducer, initialState)

    const setCategories = useCallback( 
        payload => { dispatch({type:'set-categories', payload}) } ,
        [dispatch]
    )

    const setProductsCart = useCallback( 
        payload => { dispatch({type:'set-products-cart', payload}) } ,
        [dispatch]
    ) 

    const setProductCart = useCallback( 
        payload => { dispatch({type:'set-product-cart', payload}) } ,
        [dispatch]
    )

    const value= useMemo(
        ()=>({
            ...state,
            setCategories,
            setProductsCart,
            setProductCart
        }),
        [state]
    )

    return <CoomerceContext.Provider value={value} {...props}/>
}

export const useCommerce = () => {
    const context = React.useContext(CoomerceContext)
    if (context === undefined) {
      throw new Error(`useCommerce must be used within a CommerceProvider`)
    }
    return context
}

export const ManagedCommerceContext = ({ children }) => (
    <CommerceProvider>
      { children }
    </CommerceProvider>
)