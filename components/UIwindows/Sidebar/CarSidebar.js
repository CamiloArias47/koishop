import Link from "next/link"
import { useCommerce } from "components/CommerceContext"
import { formatPrice } from "utils"
import EmptyCart from "components/commons/ItemCart/empty-cart"
import ItemCart from 'components/commons/ItemCart'
import style from './style-cart'

export const CarSidebar = () => {
    const { cart, subtotalToPay } = useCommerce()

    let btnCheckout = ''
    let productsList = <EmptyCart/>

    if(cart.length > 0 ){
        btnCheckout = <Link href="/pagar">
                         <a className="btn btn-primary">Finalizar compra</a>
                      </Link>
        productsList = cart.map( product => <ItemCart 
                                                key={product.id} 
                                                id={product.id}
                                                name={product.name}
                                                photo={product.photo}
                                                cantidad={product.buyAmount}
                                                price={product.price}
                                            />)
    }

    return (
        <div className="cart-container">
            <ul className="cart-list">
                {productsList}
            </ul>
            <div className="pay-resume">
                <div className="pay-resume-total">
                    <span>Total:</span><span>{ formatPrice(subtotalToPay) }</span>
                </div>
                
                {btnCheckout}
            </div>

            <style jsx>{style}</style>
        </div>
    )
}