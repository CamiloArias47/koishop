import { formatPrice } from "utils"
import { useCommerce } from "components/CommerceContext"

import ProductList from "components/commons/ProductList"
import style from 'styles/style-pago'

export default function RevisionTab({handlerNext}){

    const { cart, subtotalToPay } = useCommerce()

    const butonNext = cart.length === 0 
                        ? ''
                        : <button 
                            className="btn btn-primary btn-buy" onClick={handlerNext}  >
                                Hacer compra
                        </button>

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
        </div>
    )
}