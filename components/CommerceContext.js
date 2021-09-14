import React, { useCallback, useMemo }  from 'react'

const initialState = {
    categories : [],
    cart:[],
    totalProductsInCart:0,
    subtotalToPay:0
}

export const CoomerceContext = React.createContext(initialState)
CoomerceContext.displayName = CoomerceContext

export const countProductsInCart = (products) => {
    let total = products.length > 0 
                  ? products.reduce( (acumulador,current) => acumulador+parseInt(current.buyAmount), 0)
                  : 0  
    return total
}

export const sumSubtotal = (products) => {
    return products.reduce( (acc, actual) => acc+actual.price*actual.buyAmount, 0)
}

function commerceReducer(state, action){
    switch(action.type){
        case 'set-categories' : {
            return {
                ...state,
                categories : action.payload
            }
        }
        case 'set-products-cart' : {
            let cart = action.payload
            let total = countProductsInCart(cart)
            let subtotal = cart.length > 0 ? sumSubtotal(cart) : 0     
            return {
                ...state,
                cart : action.payload,
                totalProductsInCart: total,
                subtotalToPay : subtotal
            }
        }
        case 'set-product-cart' : {
            let {id, buyAmount} = action.payload
            buyAmount = parseInt(buyAmount)
            let productsInCart = state.cart  
            let exist = state.cart.find( product => product.id === id)

            if(exist){
                let position = productsInCart.findIndex( p => p.id === id)
                productsInCart[position] = action.payload
            }
            else{
                productsInCart = productsInCart.concat(action.payload)
            }

           
            let subtotal = sumSubtotal(productsInCart) 

            return {
                ...state,
                cart : productsInCart,
                subtotalToPay : subtotal,
                totalProductsInCart: countProductsInCart(productsInCart)
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