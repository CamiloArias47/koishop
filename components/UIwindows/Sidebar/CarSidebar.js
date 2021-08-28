import { useCart } from "hooks/useCart"
import { useCommerce } from "components/CommerceContext"

export const CarSidebar = () => {
    const { getProductsAtFrist, cart } = useCart()
    //const { cart } = useCommerce()

    getProductsAtFrist()

    return (
        <div>
            Car view
            {cart.map( product => <div key={product.id}>{product.name}</div>)}
        </div>
    )
}