import { formatPrice } from 'utils'
import style from './style'
import styleGlobalsTable from 'styles/global-table'

export default function ProductListReview ({ name, price, buyAmount }) {
  buyAmount = Number(buyAmount)

  return (
        <tr>
            <td className="product-column">
              <b>{name}</b>
            </td>
            <td className="price-td">
                {formatPrice(price)}
            </td>
            <td className="amount-td">
                    {buyAmount}
            </td>
            <td>
                {formatPrice(price * buyAmount)}
            </td>

            <style jsx>{style}</style>
            <style jsx>{styleGlobalsTable}</style>
        </tr>
  )
}
