import { useCommerce, 
        useSaveCart } from "components/CommerceContext"
import { useUI, MODAL_VIEWS } from "components/UIcontext"
import useBill from "hooks/useBill"
import { formatPrice } from "utils"

import ProductList from "components/commons/ProductList"
import style from 'styles/style-pago'
import styleGlobalsTable from 'styles/global-table'
import styleSumary from 'styles/global-sumary-pay'
import { useCart } from 'hooks/useCart'

export default function RevisionTab({handlerNext, uid}){

    const { cart, subtotalToPay } = useCommerce()

    const { validateBillId} = useBill()

    const {saveCart, billNotPayed, validateAmount} = useSaveCart()

    const { quitProduct, addProduct } = useCart()

    const { 
        openDisplayBlockWindow, 
        closeDisplayBlockWindow,
        openModal,
        openToast,
        setModalView
     } = useUI()
    
    const saveDetailsBill = ()=>{
        openDisplayBlockWindow()

        billNotPayed()
            .then( () => validateAmount() )
            .then( () => saveCart(uid) )
            .then( () => handlerNext() )
            .catch(err => {
                if(typeof err === 'object'){
                    if(err.type){
                        if( err.type === 'referencia pagada') handlerAskForNewPay()
                        if( err.type === 'no stock') handlerNoStock(err.noStock)
                    }
                }
                closeDisplayBlockWindow()
            })
    }
        
    const handlerAskForNewPay = () => {
        setModalView(MODAL_VIEWS.COMFIRM_BUY_AGAIN)
        openModal()
    }

    const handlerNoStock = (productsNoStock) =>{
        productsNoStock.forEach( product => {
            let {type, id, name, price, photo, amount, colorAmount, colorName} = product
            let msg = ""

            if(amount <= 0){
                msg = type === 'no-stock'
                    ? `Han comprado la última unidad disponible de ${name}`
                    : `Han comprado la última unidad del color que elegiste de ${name}`
                quitProduct(id)
            }

            if(amount === 1){
                msg = `Solo queda una unidad disponible de ${name}`
                addProduct({id, name, price, buyAmount:1, photo, stock:amount})
            } 

            if(amount > 1){
                msg = type === 'no-stock' 
                    ? `Solo quedan ${amount} unidades disponibles de ${name}`
                    : `Solo quedan ${colorAmount} unidades disponibles de ${name}, en el color ${colorName}`

                let newAmountToBuy = type === 'no-stock' ? amount : colorAmount

                addProduct({id, name, price, buyAmount:newAmountToBuy, photo, stock:amount})
            }

            openToast({msg})
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