import { useEffect } from "react"
import { useCommerce } from "components/CommerceContext"
import { useBuyForm } from "components/BuyformContext"
import useBill from "hooks/userBill"
import { setBill, updateBill } from "firebaseApi/firestoreDB/bill"
import { formatPrice } from "utils"

import ProductList from "components/commons/ProductList"
import style from 'styles/style-pago'

export default function RevisionTab({handlerNext, uid}){

    const { cart, subtotalToPay } = useCommerce()
    const {reference, setReference} = useBuyForm()

    const {
        setBillId,
        getBillIdTimestamp,
        getBillId,
        deleteBill,
        deleteBillTime
    } = useBill()

    const localBillId = getBillId()
    
    //revisar si hay una referencia en el localstorage (si el usuario inicio un proceso de compra)
    //esto evita que el usuario cree más de una factura en la base de datos para una sola compra
    //solo se le permite crear otra factura si ha pasado un dia desde que inicio una compra (creo factura en base de datos) 
    //y no termino el proceso, se le da un día para retomar dicha compra 
    useEffect( ()=>{
        console.log({localBillId})
        if(localBillId !== null){
            const createdBill =  new Date(getBillIdTimestamp()).getTime()
            const now =  Date.now() 
            const diff = (now - createdBill) / 1000
            //Si no ha pasado más de un dia retomamos la factura creada
            if(diff <= 86400){
                setReference(localBillId)
            }
            else{
                deleteBill()
                deleteBillTime()
            }
        }
    },[localBillId])

    const saveDetailsBill = ()=>{
        const cartSave = cart.map( pcart => {
            return {
                id: pcart.id,
                amount: pcart.buyAmount,
                name: pcart.name,
                pricex1: pcart.price
            }
        })

        const bill = {
            uid,
            cart: cartSave,
            status:'incomplete'
        }

        if(reference === undefined){
            setBill(bill)
            .then( resp => {
                    console.log({msg:'saved',resp})
                    setReference(resp.bid)
                    setBillId(resp.bid)
                    handlerNext()
                })
        }
        else{
            bill.bid = reference
            updateBill(bill)
                .then( resp => {
                    console.log({msg:'updated',resp})
                    handlerNext()
                })
        }
    }

    const butonNext = cart.length === 0 
                        ? ''
                        : <button 
                            className="btn btn-primary btn-buy" onClick={saveDetailsBill}  >
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
        </div>
    )
}