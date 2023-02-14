import { EmptyBagIcon } from 'components/icons'
import style from './empty-cart-style'
export default function EmptyCart () {
  return (
        <div className="empty-cart">
            <EmptyBagIcon/>
            <span>No hay productos en el carrito</span>
            <style jsx>{style}</style>
        </div>
  )
}
