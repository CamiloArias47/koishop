import { useEffect } from 'react'
import { useCommerce } from 'components/CommerceContext'
import useLocalStorage from 'hooks/useLocalStorage'
import useBill from 'hooks/useBill'

export function useCart () {
  const { deleteBill, deleteBillTime, deleteLocalCode } = useBill()
  const { setProductCart, setProductsCart } = useCommerce()
  const { canIUseLocalStorage } = useLocalStorage()

  const addProduct = ({ id, name, price, buyAmount, photo, stock, buyColor }) => {
    const productToAdd = { id, name, price, buyAmount, photo, stock, buyColor }
    const miCart = window.localStorage
    if (canIUseLocalStorage()) {
      const products = miCart.getItem('cart')
      let productsNew = products

      if (products !== null) {
        let currentP = JSON.parse(products)
        const existP = currentP.find(product => product.id === id)
        currentP = existP !== undefined ? currentP.filter(pro => pro.id !== id) : currentP
        productsNew = currentP.concat(productToAdd)
      } else {
        productsNew = [productToAdd]
      }

      miCart.setItem('cart', JSON.stringify(productsNew))
      setProductCart(productToAdd)
    }
  }

  const getProductsCart = () => {
    const miCart = window.localStorage
    const cartproducts = miCart.getItem('cart')
    return cartproducts !== null ? JSON.parse(cartproducts) : []
  }

  const getProductsAtFrist = () => {
    useEffect(() => {
      const products = getProductsCart()
      setProductsCart(products)
    }, [])
  }

  const quitProduct = (id) => {
    const miCart = window.localStorage

    let cartproducts = miCart.getItem('cart')
    cartproducts = JSON.parse(cartproducts)

    let newCartproducts = cartproducts.filter(p => p.id !== id)
    setProductsCart(newCartproducts)
    newCartproducts = JSON.stringify(newCartproducts)
    miCart.setItem('cart', newCartproducts)
  }

  const quitAllProducts = () => {
    const miCart = window.localStorage
    setProductsCart([])
    miCart.removeItem('cart')
    deleteBill()
    deleteBillTime()
    deleteLocalCode()
  }

  return {
    addProduct,
    getProductsCart,
    getProductsAtFrist,
    quitProduct,
    quitAllProducts
  }
}
