import Image from 'next/image'
import { formatPrice } from 'utils'
import { CloseIcon } from 'components/icons'
import { useCart } from 'hooks/useCart'
import { useUI } from 'components/UIcontext'

import style from './style'

export default function ProductList ({ name, id, price, photo, buyAmount, stock }) {
  buyAmount = Number(buyAmount)

  const { openToast } = useUI()

  const { quitProduct, addProduct } = useCart()

  const addOneMore = () => {
    if (buyAmount + 1 > stock) {
      openToast({ msg: `Solo quedan ${stock} disponibles` })
      return false
    }

    addProduct({ id, name, price, buyAmount: buyAmount + 1, photo, stock })
  }

  const quitOne = () => {
    if (buyAmount - 1 === 0) return
    addProduct({ id, name, price, buyAmount: buyAmount - 1, photo, stock })
  }

  return (
        <tr>
            <td className="product-column">
              <div className="image-product">
                <Image
                    src={photo}
                    width="320"
                    height="320"
                    unoptimized={process.env.ENVIRONMENT !== 'PRODUCTION'}
                />
              </div>
              <b className="product-name">{name}</b>
            </td>
            <td className="price-td">
                {formatPrice(price)}
            </td>
            <td className="amount-td">
                <div className="controls-amount">
                    <button onClick={quitOne}>-</button>
                    {buyAmount}
                    <button onClick={addOneMore}>+</button>
                </div>
            </td>
            <td>
                {formatPrice(price * buyAmount)}
            </td>
            <td className="close-td">
                <button className="close-icon" onClick={() => { quitProduct(id) }}>
                    <CloseIcon/>
                </button>
            </td>

            <style jsx>{style}</style>
        </tr>
  )
}
