import Image from "next/image"
import { formatPrice } from "utils"
import { CloseIcon } from "components/icons"

import style from './style'

export default function ProductList(props){
    let {name, id, price, photo, buyAmount} = {...props}

    return(
        <tr>
            <td className="product-column">
              <div className="image-product">
                <Image
                    src={photo}
                    width="320"
                    height="320"
                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                />
              </div>
              <b>{props.name}</b>
            </td>
            <td className="price-td">
                {formatPrice(price)}
            </td>
            <td className="amount-td">
                <div className="controls-amount">
                    <button>-</button>
                    {buyAmount}
                    <button>+</button>
                </div>
            </td>
            <td>
                {formatPrice(price*buyAmount)}
            </td>
            <td className="close-td">
                <button className="close-icon">
                    <CloseIcon/>
                </button>
            </td>

            <style jsx>{style}</style>
        </tr>
    )
}