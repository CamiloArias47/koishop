import style from "./styleDiscountCode"

export default function CheckoutTab({handlerNext}){
    const handlerSubmit = e => {
        e.preventDefault()
        handlerNext()
    }

    const handlerCode = e => {
        e.preventDefault()
        console.log('validar codigo')
    }

    return(
        <div>
            <form>
                <div className="form-controller discount-code-form">
                    <label htmlFor="discount-code">Codigo de descuento</label>   
                    <input className="input input-primary" type="text" name="discount-code" id="discount-code"/>
                    <button className="btn btn-primary" onClick={handlerCode}>
                        Aplicar
                    </button>
                </div>

                <p>
                    formas de pago
                </p>

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