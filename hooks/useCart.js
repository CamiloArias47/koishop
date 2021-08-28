import { useCommerce } from 'components/CommerceContext'
import useLocalStorage from 'hooks/useLocalStorage'

export function useCart(){

    const { setProductCart } = useCommerce()
    const { canIUseLocalStorage } = useLocalStorage()

    const addProduct = ({id, name, price, buyAmount, photo}) => {
        if(canIUseLocalStorage() ){
            const miCart = window.localStorage;
            miCart.setItem(id, JSON.stringify({name,price,buyAmount,photo}) );
            setProductCart({id, name, price, buyAmount, photo})
        }
    }

    return {
        addProduct
    }
}