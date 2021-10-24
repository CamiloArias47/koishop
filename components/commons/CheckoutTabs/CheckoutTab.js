

export default function CheckoutTab({handlerNext}){
    const handlerSubmit = e => {
        e.preventDefault()
        handlerNext()
    }

    return(
        <div>
            <form>
                <div className="form-controller">
                    <label htmlFor="discount-code">Codigo de descuento</label>   
                    <input className="input input-primary" type="text" name="discount-code" id="discount-code"/>
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
        </div>
    )
}