import { useCart } from "hooks/useCart"
import { useCommerce } from "components/CommerceContext"
import { formatPrice } from "utils"

import ItemCart from 'components/commons/ItemCart'
import style from './style-cart'

export const CarSidebar = () => {
    const { cart, subtotalToPay } = useCommerce()

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
                    <span>Subtotal:</span><span>{ formatPrice(subtotalToPay) }</span> 
                </div>
                <div>
                    <span>Envio:</span><span>Por definir</span>
                </div>
                <div className="pay-resume-total">
                    <span>Total:</span><span>{ formatPrice(subtotalToPay) }</span>
                </div>

                <button className="btn btn-primary">Finalizar compra</button>
            </div>

            <style jsx>{style}</style>
        </div>
    )
}