import React, { useCallback, useMemo }  from 'react'
import { useBuyForm } from "components/BuyformContext"
import { saveBill, updateBill, getBill } from "firebaseApi/firestoreDB/bill"
import { getProduct } from "firebaseApi/firestoreDB/products"
import useBill from "hooks/useBill"
import { cleanGionsInName } from 'utils'

const initialState = {
    categories : [],
    cart:[],
    totalProductsInCart:0,
    subtotalToPay:0,
    priceBeforeDiscount:0,
    discountValue:0,
    discountCode:''
}

export const TRANSACTION_STATUS = {
    ok : 'APPROVED',
    fail: 'DECLINED',
    incomplete: 'incomplete',
    pending: 'PENDING'
}

export const TRANSACTION_STATUS_SHOW_NAME = {
    APPROVED : 'Aprobado',
    DECLINED : 'Pago rechazado',
    incomplete: 'Abandonado'
}

export const STATUS_ICON = {
    APPROVED : '✓',
    DECLINED : 'x',
    incomplete: '!'
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
            let categories = action.payload
            categories = categories.map(cat => ( {...cat, name : cleanGionsInName(cat.id) } ) )

            return {
                ...state,
                categories
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
                subtotalToPay : subtotal,
                priceBeforeDiscount : subtotal
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
                priceBeforeDiscount : subtotal,
                totalProductsInCart: countProductsInCart(productsInCart)
            }
        }
        case 'set-discount' : {
            const {discount, type, code} = action.payload
            let discountValue = 0
            let discountCode = type === 'no discount' ? '' : code
            let newTotal = state.subtotalToPay

            if(type === 'no discount' && (state.priceBeforeDiscount > state.subtotalToPay)){
                newTotal = state.priceBeforeDiscount
            }
            else{
                let discountValues =  handlerDiscount({type, discount, total:state.subtotalToPay})
                newTotal = discountValues.newTotal
                discountValue = discountValues.discountValue
            }

            return {
                ...state,
                subtotalToPay: newTotal,
                discountValue,
                discountCode
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

    const setDiscount = useCallback(
        payload => { dispatch( {type:'set-discount', payload}) },
        [dispatch]
    )

    const value= useMemo(
        ()=>({
            ...state,
            setCategories,
            setProductsCart,
            setProductCart,
            setDiscount
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

export const useSaveCart = () => {
    const context = useCommerce()
    const {reference, setReference} = useBuyForm()
    const {setBillId} = useBill()

    const saveCart = (uid) =>{
        const {cart} = context 
    
        const cartSave = cart.map( pcart => {
            return {
                id: pcart.id,
                amount: pcart.buyAmount,
                name: pcart.name,
                pricex1: pcart.price
            }
        })

        const bill = {
            uid,
            cart: cartSave,
            status:'incomplete'
        }
    
        if(reference === undefined){
            return saveBill(bill)
                   .then( resp => {
                        const dataResp = {msg:'saved',resp}
                        setReference(resp.bid)
                        setBillId(resp.bid)
                        return  dataResp
                    })
        }
        else{
            bill.bid = reference
            return updateBill(bill)
                .then( resp => {
                    const dataResp = {msg:'updated',resp}
                    return  dataResp
                })
        }
    }

    const billNotPayed = () => {
        return new Promise((resolve, reject) => {
            if(reference){
                getBill(reference)
                 .then( result => {
                    if(result.status === 'APPROVED'){
                        reject({type:'referencia pagada'})
                    } 
                    else{
                        resolve(true)
                    }
                 })
            }
            else{
                resolve(true)
            }
        })
    }

    const validateAmount = async () => {
        const {cart} = context
        let consults = []
        cart.forEach( item => consults.push( getProduct(item.id) ))

        return Promise.all(consults)
            .then(results => {
                let noStock = []
                console.log(results)
                results.forEach( product => {
                    let cartCompare = cart.find( itemCart => itemCart.id === product.id)
                    let {buyAmount} = cartCompare
                    if(buyAmount > product.amount) noStock.push( {buyAmount, ...product} )
                } )

                if(noStock.length === 0) return true
                throw {type:'no stock',noStock}
            })
    }

    return {saveCart, billNotPayed, validateAmount}
}

/**
 * 
 * @param {type} string | tipo de descuento 
 * @param {discount} string|number valor del descuento
 * @param {total} number | valor al que se le aplica el descuento
 * @returns 
 */
export const handlerDiscount = ({type, discount, total}) => {
    let newTotal = total
    let discountValue = 0

    if(type === 'percent discount'){
        const discountPercent = parseInt(discount)
        discountValue = total*discountPercent/100
        newTotal = total - discountValue
    }

    if(type === 'free-delivery'){
        //aun no se cuanto cuesta el delivery
         discountValue = 200
    }

    if(type === 'value discount'){
        discountValue = parseInt(discount)
        newTotal = total - discountValue
    }

    return {newTotal,discountValue}
}

export const centsToPesos = ({amountInCents}) => {
    amountInCents = amountInCents.toString()
    const lengthPrice = amountInCents.length
    let price = amountInCents.substring(0,lengthPrice-2)
    price = Number(price)
    return price
}

export const ManagedCommerceContext = ({ children }) => (
    <CommerceProvider>
      { children }
    </CommerceProvider>
)