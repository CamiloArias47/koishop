import { useEffect, useState } from "react"
import { useCommerce } from "components/CommerceContext"
import { useBuyForm } from 'components/BuyformContext'
import { updateCodeAndPriceToPay } from 'firebaseApi/firestoreDB/bill'
import {formatPrice} from "utils"
import style from "./styleDiscountCode"
import {SuccessAnimation} from "components/icons"
import { useUI } from "components/UIcontext"

export default function CheckoutTab({handlerNext, uid}){
    const [code, setCode ] = useState('')
    const [codeItsFine, setCodeItsFine ] = useState(undefined)
    const [statusCodeTex, setStatusCodeTex] = useState('')

    const { reference } = useBuyForm()
    const { subtotalToPay,
            priceBeforeDiscount,
            setDiscount,
            discountValue } = useCommerce()
    const {
            openDisplayBlockWindow,
            closeDisplayBlockWindow
          } = useUI()
    
    //user un efecto cuando cambie discountValue
    useEffect( () => {
        console.log('limpiar codigo')
        setDiscount({discount:0, type:'no discount',code:''})
    },[])

    useEffect( () => {
        console.log('establecer codigo en firestore')
        const codetoToUpdate = discountValue === 0 ? '':code

        const dataToDiscount = {
            bid:reference, 
            code:codetoToUpdate, 
            discountValue, 
            totalToPay : subtotalToPay
        }

        updateCodeAndPriceToPay(dataToDiscount)

    }, [discountValue])

    const handlerChange = e => {
        setCode(e.target.value)
        setCodeItsFine(undefined)
        setStatusCodeTex('')
        setDiscount({discount:0, type:'no discount',code})
    }

    const handlerSubmit = e => {
        e.preventDefault()
        handlerNext()
    }

    const handlerCode = e => {
        e.preventDefault()
        if(code){

            const bodyData = {
                uid, 
                priceToPay : priceBeforeDiscount
            }

            //no se usa el frontend para validar 
            if(priceBeforeDiscount === subtotalToPay){
                openDisplayBlockWindow()
                fetch(`/api/codes/${code}`,{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData) 
                  })
                .then(res => res.json())
                .then(data => {

                    let codeFine = false,
                        codeText = 'código no válido', 
                        discountData = {discount:0, type:'no discount',code:''}

                    if(data.exist){
                        if(data.status){
                            codeFine = true
                            discountData = {discount:data.value, type:data.type, code}
                        }
                        
                        codeText = data.motive
                    }

                    setCodeItsFine( codeFine )
                    setStatusCodeTex( codeText )
                    setDiscount( discountData )

                    closeDisplayBlockWindow()
                })

            }
        }
    }

    let statusCodeAni = ''

    if(codeItsFine !== undefined){
        statusCodeAni = codeItsFine ? <SuccessAnimation/> : ''
    }

    let priceWithDIscount = ''
    if(priceBeforeDiscount > subtotalToPay){
        priceWithDIscount = formatPrice(priceBeforeDiscount)
    }

    return(
        <div>
            <form>
                <div className="form-controller discount-code-form">
                    <label htmlFor="discount-code">
                        <h3>Código de descuento</h3>
                    </label>   
                    <input className="input input-primary" type="text" value={code} onChange={handlerChange} name="discount-code" id="discount-code"/>
                    <button className="btn btn-primary" onClick={handlerCode}>
                        Aplicar
                    </button>
                </div>
                
                <div className="info-code">
                    <div className="info-code-text">
                       {statusCodeTex}
                    </div>
                    <div className="info-code-animation">
                       {statusCodeAni}
                    </div>
                </div>

                <div className="checkout-resume">
                    <div><b>{(priceBeforeDiscount > subtotalToPay)?'Total':''}</b></div>
                    <div>{priceWithDIscount}</div>
                    <div><b>{(priceBeforeDiscount > subtotalToPay)?'Descuentos':''}</b></div>
                    <div>{(priceBeforeDiscount > subtotalToPay)?formatPrice(discountValue):''}</div>
                    <div className="total-to-pay"><b>Total a pagar:</b></div>
                    <div className="total-to-pay">{formatPrice(subtotalToPay)}</div>    
                </div>

                <div className="container-btn-buy">
                    <button className="btn btn-primary btn-buy" onClick={handlerSubmit}>
                            Hacer compra
                    </button>
                </div>

            </form>

            <style jsx>{style}</style>
        </div>
    )
}