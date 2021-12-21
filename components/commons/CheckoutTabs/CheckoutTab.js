import { useState } from "react"
import { useCommerce } from "components/CommerceContext"
import {formatPrice} from "utils"
import style from "./styleDiscountCode"
import {SuccessAnimation} from "components/icons"

export default function CheckoutTab({handlerNext, uid}){
    const [code, setCode ] = useState('')
    const [codeItsFine, setCodeItsFine ] = useState(undefined)
    const [statusCodeTex, setStatusCodeTex] = useState('')

    const { subtotalToPay,
            priceBeforeDiscount,
            setDiscount,
            discountValue } = useCommerce()

    const handlerChange = e => {
        setCode(e.target.value)
        setCodeItsFine(undefined)
        setStatusCodeTex('')
        setDiscount({discount:0, type:'no discount'})
    }

    const handlerSubmit = e => {
        e.preventDefault()
        handlerNext()
    }

    const handlerCode = e => {
        e.preventDefault()
        if(code){
            console.log('validar codigo')
            fetch(`/api/codes/${code}`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid}) 
              })
                .then(res => res.json())
                .then(data => {
                    
                    if(data.exist){
                        if(data.status){
                            setCodeItsFine(true)
                            setStatusCodeTex(data.motive)
                            setDiscount({discount:data.value, type:data.type})
                        }
                        else{
                            setStatusCodeTex(data.motive)
                            setCodeItsFine(false)
                        }
                    }
                    else{
                        setCodeItsFine(false)
                        setStatusCodeTex('código no válido')
                    }
                })
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
                    <label htmlFor="discount-code">Codigo de descuento</label>   
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