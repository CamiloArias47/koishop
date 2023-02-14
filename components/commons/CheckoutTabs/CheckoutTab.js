import { useEffect, useState } from 'react'
import { useCommerce } from 'components/CommerceContext'
import { useBuyForm } from 'components/BuyformContext'
import { updateCodeAndPriceToPay } from 'firebaseApi/firestoreDB/bill'
import { formatPrice } from 'utils'
import style from './styleDiscountCode'
import { SuccessAnimation } from 'components/icons'
import { useUI } from 'components/UIcontext'
import { getDeliveryByCity } from './delivery-cost'

export default function CheckoutTab ({ handlerNext, uid }) {
  const [code, setCode] = useState('')
  const [codeItsFine, setCodeItsFine] = useState(undefined)
  const [statusCodeTex, setStatusCodeTex] = useState('')

  const { reference, department, city } = useBuyForm()

  const {
    totalToPay,
    subtotalToPay,
    priceBeforeDiscount,
    discountCode,
    setDiscount,
    discountValue,
    deliveryCost,
    setTotalToPay,
    setDeliveryCost
  } = useCommerce()

  const {
    openDisplayBlockWindow,
    closeDisplayBlockWindow
  } = useUI()

  // user un efecto cuando cambie discountValue
  useEffect(() => {
    setDiscount({ discount: 0, type: 'no discount', code: '' })
  }, [])

  useEffect(() => {
    const codetoToUpdate = discountValue === 0 ? '' : code
    const dataToDiscount = {
      bid: reference,
      code: codetoToUpdate,
      discountValue,
      totalToPay: subtotalToPay
    }

    updateCodeAndPriceToPay(dataToDiscount)
  }, [discountValue])

  const handlerChange = e => {
    setCode(e.target.value)
    setCodeItsFine(undefined)
    setStatusCodeTex('')
    if (discountCode === 'free-delivery') {
      const cityDeliveryCost = getDeliveryByCity(city, department)
      setDeliveryCost(cityDeliveryCost)
    } else {
      setDiscount({ discount: 0, type: 'no discount', code })
    }
    setTotalToPay()
  }

  const handlerSubmit = e => {
    e.preventDefault()
    handlerNext()
  }

  const handlerCode = e => {
    e.preventDefault()
    if (code) {
      const bodyData = {
        uid,
        priceToPay: priceBeforeDiscount,
        bid: reference
      }

      // no se usa el frontend para validar
      if (priceBeforeDiscount === subtotalToPay) {
        openDisplayBlockWindow()
        fetch(`/api/codes/${code}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
        })
          .then(res => res.json())
          .then(data => {
            let codeFine = false
            let codeText = 'código no válido'
            let discountData = { discount: 0, type: 'no discount', code: '' }

            if (data.exist) {
              if (data.status) {
                codeFine = true
                discountData = { discount: data.value, type: data.type, code }
              }

              codeText = data.motive
            }

            setCodeItsFine(codeFine)
            setStatusCodeTex(codeText)
            setDiscount(discountData)
            setTotalToPay()

            closeDisplayBlockWindow()
          })
      }
    }
  }

  let statusCodeAni = ''

  if (codeItsFine !== undefined) {
    statusCodeAni = codeItsFine ? <SuccessAnimation/> : ''
  }

  let priceWithDIscount = ''
  if (priceBeforeDiscount > subtotalToPay) {
    priceWithDIscount = formatPrice(priceBeforeDiscount)
  }

  return (
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
                    <div>
                        <span><b>{(priceBeforeDiscount > subtotalToPay) ? 'Productos' : ''}</b></span>
                        <span className="checkout-resume--price">{priceWithDIscount}</span>
                    </div>
                    <div>
                        <span><b>{(priceBeforeDiscount > subtotalToPay) ? 'Descuentos' : ''}</b></span>
                        <span className="checkout-resume--price">{(priceBeforeDiscount > subtotalToPay) ? '-' + formatPrice(discountValue) : ''}</span>
                    </div>
                    <div>
                        <span><b>Subtotal:</b></span>
                        <span className="checkout-resume--price">{formatPrice(subtotalToPay)}</span>
                    </div>
                    <div>
                        <span><b>Envio:</b></span>
                        <span className="checkout-resume--price">{formatPrice(deliveryCost)}</span>
                    </div>
                    <div className="total-to-pay">
                        <span><b>Total a pagar:</b></span>
                        <span className="checkout-resume--price">{formatPrice(totalToPay)}</span>
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
