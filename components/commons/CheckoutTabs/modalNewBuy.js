import style from "./style-modal-new-buy"
import useBill from 'hooks/useBill'
import { useRouter } from 'next/router'
import { useCart } from "hooks/useCart"
import { useUI } from "components/UIcontext"
import { useBuyForm } from "components/BuyformContext"

export default function ModalNewBuy(){
    const { deleteBill, deleteBillTime, deleteLocalCode } = useBill()
    const router = useRouter()
    const { quitAllProducts } = useCart()
    const { closeModal } = useUI()
    const { setReference } = useBuyForm()
    
    const clearBill = () => {
        deleteBill()
        deleteBillTime()
        deleteLocalCode()
        setReference(undefined)
    }

    const handlerNo = () => {
        clearBill()
        quitAllProducts()
        router.push('/')
        closeModal()
    }

    const handlerYes = () => {
        clearBill()
        closeModal()
    }

    return(
        <div className="new-buy-wraper">
            <h1>Ya has comprado esta referencia</h1>
            <p>¿Deseas comprarlo nuevamente?</p>
            <div className="actions">
                <button className="btn btn-primary" onClick={handlerYes}>Si</button>
                <button className="btn btn-info" onClick={handlerNo}>No</button>
            </div>
            <style jsx>{style}</style>
        </div>
    )
}