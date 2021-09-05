import { useUI } from "components/UIcontext"
import { useCommerce } from "components/CommerceContext"
import { useEffect } from "react"
import { NextSeo } from 'next-seo'
import { config } from 'components/commons/Head'

import ProductList from "components/commons/ProductList"
import ListProcess from 'components/commons/ListProccess'
import { formatPrice } from "utils"

import style from 'styles/style-pago'

export default function PagarPage(){

    const { closeSidebar } = useUI() 
    const { cart, subtotalToPay } = useCommerce()

    useEffect( () => {
        closeSidebar()
    },[])

    return(
        <div className="wraper">
            <NextSeo title={'Realizar pago | '+config.title} />
            <ListProcess/>
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
                                        buyAmount={p.buyAmount}
                                        />)}
                    </tbody>
                </table>

            </div>
            
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

            <button className="btn btn-primary btn-buy">Comprar</button>
            <style jsx>{style}</style>
        </div>
    )
}