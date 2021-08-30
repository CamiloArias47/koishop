import { useEffect, useState } from 'react'
import { useCommerce } from 'components/CommerceContext'
import useLocalStorage from 'hooks/useLocalStorage'

export function useCart(){

    const { setProductCart, setProductsCart } = useCommerce()
    const { canIUseLocalStorage } = useLocalStorage()
    const [ cart, setCart ] = useState([])
    
    const addProduct = ({id, name, price, buyAmount, photo}) => {
        const productToAdd = {id, name, price, buyAmount, photo}
        const miCart = window.localStorage;
        if(canIUseLocalStorage() ){
            let products = miCart.getItem('cart')
            let productsNew = products

            if(products !== null){
                let currentP = JSON.parse(products)
                let existP =  currentP.find(product => product.id === id)
                currentP = existP !== undefined ? currentP.filter(pro => pro.id !== id) : currentP
                productsNew = currentP.concat(productToAdd)
            }
            else{
                productsNew = [productToAdd]
            }

            miCart.setItem(`cart`, JSON.stringify(productsNew) );
            setProductCart(productToAdd)
        }
    }

    const getProductsCart = () => {
        const miCart = window.localStorage;
        let cartproducts = miCart.getItem('cart')
        return  cartproducts !== null ? JSON.parse(cartproducts) : []
    }

    const getProductsAtFrist = () => {
        useEffect( () => {
            setCart( getProductsCart() )
        }, [])
        
        //setProductsCart( getProductsCart() )
    }

    const quitProduct = (id) => {
        console.log("quitar este producto: "+id)
        const miCart = window.localStorage;

        let cartproducts = miCart.getItem('cart')
        cartproducts = JSON.parse(cartproducts)

        let newCartproducts = cartproducts.filter( p => p.id !== id)
        newCartproducts = JSON.stringify(newCartproducts)

        miCart.setItem('cart', newCartproducts)
    }

    return {
        addProduct,
        getProductsCart,
        getProductsAtFrist,
        quitProduct,
        cart
    }
}