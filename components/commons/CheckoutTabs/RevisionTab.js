import { useCommerce, 
        useSaveCart } from "components/CommerceContext"
import useBill from "hooks/useBill"
import { formatPrice } from "utils"

import ProductList from "components/commons/ProductList"
import style from 'styles/style-pago'
import styleGlobalsTable from 'styles/global-table'
import styleSumary from 'styles/global-sumary-pay'

export default function RevisionTab({handlerNext, uid}){

    const { cart, subtotalToPay } = useCommerce()

    const { validateBillId} = useBill()

    const {saveCart} = useSaveCart()
    
    const saveDetailsBill = ()=>{

         saveCart(uid).then( (data) => {
             console.log(data)
             handlerNext()
         })
         .catch(err => {
             console.error({err})
         })
    }

    const butonNext = cart.length === 0 
                        ? ''
                        : <button 
                            className="btn btn-primary btn-buy" onClick={saveDetailsBill}  >
                                Hacer compra
                        </button>

    //valida si existe un id de factura y su fecha
    validateBillId() 

    return(
        <div>
            <div className="wraper-table">
                <table>
                    <thead>
                        <tr>
                            <th className="product-column">Producto</th>
                            <th>precio</th>
                            <th>cantidad</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { cart.map(p => <ProductList 
                                        key={p.id}
                                        name={p.name}
                                        id={p.id}
                                        price={p.price}
                                        photo={p.photo}
                                        stock={p.stock}
                                        buyAmount={p.buyAmount}
                                        />)}
                    </tbody>
                </table>

            </div>
            
            <div className="sumary-cont">
                <div className="anouncements"></div>
                <div className="total-container">
                    <div className="detail-field">
                        <div>Productos: </div>
                        <div>{ formatPrice(subtotalToPay) }</div>
                    </div>
                    <div className="detail-field">
                        <div>Envio: </div>
                        <div>Por determinar</div>
                    </div>
                    <div className="detail-field total">
                        <div>Total</div>
                        <div>{ formatPrice(subtotalToPay) }</div>
                    </div>
                    
                </div>
            </div>

            <div className="container-btn-buy">
                { butonNext }
            </div>

            <style jsx>{style}</style>
            <style jsx>{styleGlobalsTable}</style>
            <style jsx>{styleSumary}</style>
        </div>
    )
}