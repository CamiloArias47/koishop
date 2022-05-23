import { formatDate, formatPrice } from "utils";
import Link from 'next/link'

import {handlerDiscount, TRANSACTION_STATUS} from 'components/CommerceContext'
import {RowIcon} from 'components/icons'
import ProductListReview from 'components/commons/ProductList/review-pedido'

import style from './style'
import styleGlobalsTable from 'styles/global-table'
import styleSumary from 'styles/global-sumary-pay'

export default function BillDetails({bill}){

    const {data,code, addressDetails} = bill

    let date = ''
    let discountAmount = 0
    let codeDescription = ''
    let addressContent = ''
    let userBillDetails = ''

    if (data.timestampEnvioStep || data.timestamp){
        date = (data.timestampEnvioStep)
            ? formatDate( data.timestampEnvioStep._seconds )
            : formatDate( data.timestamp._seconds )
    }

    const subtotals = data.products.map(p => p.pricex1*p.amount)
    const total = subtotals.reduce((prev, curr) => prev + curr, 0);

    if(code){
        let {discountValue} = handlerDiscount({type:code.type, discount:code.value, total})
        discountAmount = discountValue
        codeDescription =  <div className="detail-field">
                              <div>Codigo de descuento ({data.promocode}): </div>
                              <div>- {formatPrice(discountValue)}</div>
                           </div>
    }

    if(!data.total){
        data.total = total - discountAmount
    }


    let status = (data.status === TRANSACTION_STATUS.ok)
                ? 'Pago exitoso'
                : 'Cancelado'
                
    if(addressDetails){
        addressContent = <div>
                            <h1>Dirección de envio</h1>
                            <ul>
                                <li>{addressDetails.department} - {addressDetails.city}</li>
                                <li>{addressDetails.address} - {addressDetails.addresscomplement}</li>
                                <li>{addressDetails.neighborhood}</li>
                                <li>{addressDetails.nextToAddress} </li>
                            </ul>
                         </div>
    }
     
    if(data.name){
        userBillDetails = <div>
                                <h1>Facturación</h1>
                                <ul>
                                    <li>{data.name}</li>
                                    <li>{data.cedula}</li>
                                    <li>{data.phone}</li>
                                </ul>
                          </div>
    }

    return <div>
             <div className="head-description">
                <div className="go-back-pedidos">
                    <Link href="/user/pedidos">
                        <a>
                            <RowIcon height={42} width={42}/>
                            <span>todos tus pedidos</span>
                        </a>
                    </Link>
                </div>
                <h1>Pedido: {data.code || data.id}</h1>
             </div>
             <span className="date">{date}</span>
        
             <span className={'status '+data.status}>{status}</span>

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
             
             <div className="details-bills">
                <div className="address-details">
                    {addressContent}
                </div>
                
                <div className="user-bill-details">
                    {userBillDetails}
                </div>
             </div>


             <style jsx>{style}</style>
             <style jsx>{styleGlobalsTable}</style>
             <style jsx>{styleSumary}</style>
           </div>
}