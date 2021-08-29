import  Image  from 'next/image'
import { formatPrice } from "utils"
import style from './style'

const ItemCart = ({photo, name, cantidad,price}) => {
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
                <span><b>Cantidad:</b> {cantidad}</span> 
                <span><b>Precio:</b> {formatPrice(price)}</span>
            </div>
            <style jsx>{style}</style>
        </li>
    )
}

export default ItemCart