import { useState } from "react"
import style from "./styleDiscountCode"
import {SuccessAnimation} from "components/icons"

export default function CheckoutTab({handlerNext}){
    const [code, setCode ] = useState('')
    const [codeItsFine, setCodeItsFine ] = useState(undefined)
    const [statusCodeTex, setStatusCodeTex] = useState('')

    const handlerChange = e => {
        setCode(e.target.value)
        setCodeItsFine(undefined)
        setStatusCodeTex('')
    }

    const handlerSubmit = e => {
        e.preventDefault()
        handlerNext()
    }

    const handlerCode = e => {
        e.preventDefault()
        if(code){
            console.log('validar codigo')
            fetch(`/api/codes/${code}`)
                .then(res => res.json())
                .then(data => {
                    
                    if(data.exist){
                        if(data.status){
                            setCodeItsFine(true)
                            setStatusCodeTex(data.motive)
                        }
                        else{
                            setStatusCodeTex(data.motive)
                            setCodeItsFine(false)
                        }
                    }
                    else{
                        setCodeItsFine(false)
                        setStatusCodeTex('código no valido')
                    }
                })
        }
    }

    let statusCodeAni = ''

    if(codeItsFine !== undefined){
        statusCodeAni = codeItsFine ? <SuccessAnimation/> : ''
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