import  Image  from 'next/image'
import {CloseIcon} from 'components/icons'
import { formatPrice } from "utils"
import style from './style'
import { useCart } from 'hooks/useCart'

const ItemCart = ({id, photo, name, cantidad, price}) => {
    const { quitProduct } = useCart()

    const itemTotal = cantidad > 1 
                        ? <span>
                            <b>Total: </b> 
                            {formatPrice(price*cantidad)} 
                        </span>
                        : ''

    return (
        <li>
            <Image 
              src={photo} 
              width="120" 
              height="120" 
              unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
              className="item-car-image"
            />
            <div className="item-car-description">
                <h3>{name}</h3>
                <span><b>Cantidad:</b> { cantidad }</span> 
                <span>
                    <b>Precio: </b> 
                    {formatPrice(price)}
                </span>
                {itemTotal}
            </div>
            <div className="quit-product-container">
                <button className="close-icon" onClick={()=>{quitProduct(id)}}>
                    <CloseIcon width="25" height="25"/>
                </button>
            </div>
            <style jsx>{style}</style>
        </li>
    )
}

export default ItemCart