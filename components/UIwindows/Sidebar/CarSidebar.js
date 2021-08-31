import { useCart } from "hooks/useCart"
import { useCommerce } from "components/CommerceContext"

import ItemCart from 'components/commons/ItemCart'
import style from './style-cart'

export const CarSidebar = () => {
    //const { getProductsAtFrist } = useCart()
    const { cart } = useCommerce()

    //getProductsAtFrist()

    return (
        <div className="cart-container">
            <ul>
                {cart.map( product => <ItemCart 
                                        key={product.id} 
                                        id={product.id}
                                        name={product.name}
                                        photo={product.photo}
                                        cantidad={product.buyAmount}
                                        price={product.price}
                                       /> 
                )}
            </ul>
            <div className="pay-resume">
                <div>
                    <span>Subtotal:</span><span>$ 250.300</span> 
                </div>
                <div>
                    <span>Envio:</span><span>$ 10.000</span>
                </div>
                <div className="pay-resume-total">
                    <span>Total:</span><span>$ 260.000</span>
                </div>

                <button className="btn btn-primary">Finalizar compra</button>
            </div>

            <style jsx>{style}</style>
        </div>
    )
}