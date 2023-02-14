import { formatDate, formatDateWithHour, formatPrice } from 'utils'
import Link from 'next/link'

import { handlerDiscount, TRANSACTION_STATUS, TRANSACTION_STATUS_SHOW_NAME } from 'components/CommerceContext'
import { RowIcon } from 'components/icons'
import ProductListReview from 'components/commons/ProductList/review-pedido'
import AddressCard from 'components/commons/Address-card'
import BillCard from './bill-card'

import style from './style'
import styleGlobalsTable from 'styles/global-table'
import styleSumary from 'styles/global-sumary-pay'

export default function BillDetails ({ bill }) {
  const { data, code, addressDetails } = bill

  let date = ''
  let discountAmount = 0
  let codeDescription = ''
  let addressContent = ''
  let userBillDetails = ''
  let waitUntil = ''

  if (data.timestampEnvioStep || data.timestamp) {
    date = (data.timestampEnvioStep)
      ? formatDate(data.timestampEnvioStep._seconds)
      : formatDate(data.timestamp._seconds)
  }

  const subtotals = data.products.map(p => p.pricex1 * p.amount)
  const total = subtotals.reduce((prev, curr) => prev + curr, 0)

  if (code) {
    const { discountValue } = handlerDiscount({ type: code.type, discount: code.value, total })
    discountAmount = discountValue
    codeDescription = <div className="detail-field">
                              <div>Codigo de descuento ({data.promocode}): </div>
                              <div>- {formatPrice(discountValue)}</div>
                           </div>
  }

  if (!data.total) {
    data.total = total - discountAmount
  }

  if (data.status === TRANSACTION_STATUS.pending && data.waitSince) {
    waitUntil = new Date(data.waitSince)
    const date = waitUntil.getDate()
    waitUntil.setDate(date + 3)
    waitUntil = formatDateWithHour(waitUntil)
  }

  addressContent = addressDetails ? <AddressCard direction={addressDetails} /> : ''

  userBillDetails = data.name ? <BillCard data={data}/> : ''

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
             </div>

             <div className="ticket">
                <div className="ticket_border ticket_border--top"></div>
                <h1>Pedido: {data.code || data.id}</h1>
                <span className="date">{date}</span>

                <span className={'status ' + data.status}>{ TRANSACTION_STATUS_SHOW_NAME[data.status] }</span>

                {
                    data.status === TRANSACTION_STATUS.pending
                      ? <div>
                            La transacción esta pendiente de pago
                            Acércate a un Corresponsal Bancario Bancolombia hasta el <b>{waitUntil}</b> y realiza tu pago.<br/>
                            Referencia de pago: <b>{data?.paymentIntentionIdentifier}</b> <br/>
                            Número de convenio: <b>{data?.businessAgreementCode}</b>
                          </div>
                      : null
                }

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
                            {data.products.map(p => <ProductListReview key={p.id} name={p.name} price={p.pricex1} buyAmount={p.amount}/>)}
                        </tbody>
                    </table>
                </div>

                <div className="ticket_products">
                    {
                        data.products.map(p =>
                            <div className="ticket_item" key={p.id}>
                                <span><b>{ p.name } </b></span>
                                <span>Precio unitario: <b>{ formatPrice(p.pricex1) }</b> </span>
                                <span>Cantidad: <b>{ p.amount }</b> </span>
                            </div>
                        )
                    }
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
                            <div>$0</div>
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
                        { addressDetails ? <h1>Dirección de envio</h1> : ''}
                        {addressContent}
                    </div>

                    <div className="user-bill-details">
                        { data.name ? <h1>Facturación</h1> : ''}
                        {userBillDetails}
                    </div>
                </div>

                <div className="ticket_border ticket_border--bottom"></div>
             </div>

             <style jsx>{style}</style>
             <style jsx>{styleGlobalsTable}</style>
             <style jsx>{styleSumary}</style>
           </div>
}
