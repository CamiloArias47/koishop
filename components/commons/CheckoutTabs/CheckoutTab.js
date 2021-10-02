export default function CheckoutTab(){
    return(
        <div>
            <form>
                <div className="form-controller">
                    <label htmlFor="discount-code">Codigo de descuento</label>   
                    <input className="input input-primary" type="text" name="discount-code" id="discount-code" required/>
                </div>

                <p>
                    formas de pago
                </p>
            </form>
        </div>
    )
}