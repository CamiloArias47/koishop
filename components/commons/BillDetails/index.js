import { formatDate, formatPrice } from "utils";

import ProductListReview from 'components/commons/ProductList/review-pedido'
import {handlerDiscount, TRANSACTION_STATUS} from 'components/CommerceContext'

import style from './style'
import styleGlobalsTable from 'styles/global-table'
import styleSumary from 'styles/global-sumary-pay'

export default function BillDetails({bill}){

    const {data,code} = bill

    const date = formatDate( data.timestampEnvioStep._seconds )

    const subtotals = data.products.map(p => p.pricex1*p.amount)
    const total = subtotals.reduce((prev, curr) => prev + curr, 0);

    let codeDescription = ''

    if(code){
        let {discountValue} = handlerDiscount({type:code.type, discount:code.value, total})
        codeDescription =  <div className="detail-field">
                              <div>Codigo de descuento ({data.promocode}): </div>
                              <div>- {formatPrice(discountValue)}</div>
                           </div>
    }

    let status = (data.status === TRANSACTION_STATUS.ok) ? 'Pago exitoso' : 'Cancelado'

     

    return <div>
             <h1>Pedido: {data.id}</h1>
             <span className="date">{date}</span>
        
             <span>{status}</span>

             <div className="wraper-table">
                <table>
                    <thead>
                        <tr>
                            <th className="product-column">Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map( p => <ProductListReview key={p.id} name={p.name} price={p.pricex1} buyAmount={p.amount}/> )}
                    </tbody>
                </table>
             </div>

             <div className="sumary-cont">
                <div className="anouncements"></div>
                <div className="total-container">
                    <div className="detail-field">
                        <div>Productos: </div>
                        <div>{ formatPrice(total) }</div>
                    </div>
                    <div className="detail-field">
                        <div>Envio: </div>
                        <div>Por determinar</div>
                    </div>
                    {codeDescription}
                    <div className="detail-field total">
                        <div>Total</div>
                        <div>{ formatPrice(data.total) }</div>
                    </div>
                    
                </div>
             </div>

             <style jsx>{style}</style>
             <style jsx>{styleGlobalsTable}</style>
             <style jsx>{styleSumary}</style>
           </div>
}