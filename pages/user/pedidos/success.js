import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UserLayout from 'components/commons/UserLayout'
import useBill from 'hooks/useBill'
import { useCart } from "hooks/useCart"
import SuccessAnimation from 'components/icons/SuccessAnimation'
import  FailAnimation from 'components/icons/failCreditCardAnimation'
import { Spinner } from 'components/icons'
import { watchWebhook } from 'firebaseApi/firestoreDB/webhook'
import { TRANSACTION_STATUS } from 'components/CommerceContext'
import { colors } from 'styles/theme'
import { useBuyForm } from "components/BuyformContext"
import style from 'styles/style-success'

export default function Success(){
    const router = useRouter()
    const { id } = router.query
    const [webhook, setWebhook] = useState({})
    const { deleteBill, deleteBillTime, deleteLocalCode } = useBill()
    const { setReference } = useBuyForm()
    const { quitAllProducts } = useCart()

    useEffect( () => {
        function getterwebhook(){
            let stop = watchWebhook(id, newUpdate => {
                if(newUpdate.data){
                    let { status } = newUpdate.data.transaction
                    if(status === TRANSACTION_STATUS.ok || status === TRANSACTION_STATUS.fail) stop()

                    if(status === TRANSACTION_STATUS.ok){
                        setReference(undefined)
                        deleteBill()
                        deleteBillTime()
                        deleteLocalCode()
                        quitAllProducts()
                    } 
                    
                    setWebhook(newUpdate)
                }
            })
        } 

        if(id) getterwebhook()
    },[id])


    return(
        <UserLayout>
            <section className='state-section'>
                { 
                    webhook.data && webhook.data.transaction.status === TRANSACTION_STATUS.ok
                        ?   
                            <>
                                <h1>¡Transacción exitosa!</h1>
                                <SuccessAnimation/>

                                <Link href="/user/pedidos">
                                    <a>ir a tus pedidos</a>
                                </Link>
                            </>
                        : 
                        webhook.data && webhook.data.transaction.status === TRANSACTION_STATUS.fail
                        ?
                            <>
                                <h1>Transacción rechazada</h1>
                                <FailAnimation/>
                                <Link href="/pagar">
                                    <a alt="usar otro metodo de pago" className='btn btn-primary'>usar otro metodo de pago</a>
                                </Link>
                            </>
                        :
                            <>
                                <h1>Transacción en proceso</h1>
                                <Spinner width={40} height={40} color={colors.primary}/>
                            </>
                }
            </section>
            <style jsx>{style}</style>
        </UserLayout>
    )
}