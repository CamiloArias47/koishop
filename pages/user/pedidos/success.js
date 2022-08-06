import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import UserLayout from 'components/commons/UserLayout'
import useBill from 'hooks/useBill'
import SuccessAnimation from 'components/icons/SuccessAnimation'
import { Spinner } from 'components/icons'
import { watchWebhook } from 'firebaseApi/firestoreDB/webhook'
import { TRANSACTION_STATUS } from 'components/CommerceContext'
import creditCardLeft from 'public/images/card-fail-left.png'
import creditCardRight from 'public/images/card-fail-right.png'
import { colors } from 'styles/theme'
import style from 'styles/style-success'

export default function Success(){
    const router = useRouter()
    const { id } = router.query
    const [webhook, setWebhook] = useState({})
    const { deleteBill, deleteBillTime, deleteLocalCode } = useBill()

    useEffect( () => {
        function getterwebhook(){
            let stop = watchWebhook(id, newUpdate => {
                if(newUpdate.data){
                    let { status } = newUpdate.data.transaction
                    if(status === TRANSACTION_STATUS.ok || status === TRANSACTION_STATUS.fail) {
                        stop()
                        deleteBill()
                        deleteBillTime()
                        deleteLocalCode()
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
                            </>
                        : 
                        webhook.data && webhook.data.transaction.status === TRANSACTION_STATUS.fail
                        ?
                            <>
                                <h1>Transacción rechazada</h1>
                                <div className='animation'>
                                    <div className='animation__card animation__card--left'>
                                        <Image src={creditCardLeft} alt="tarjeta rota" layout="responsive" />
                                    </div>
                                    <div className='animation__card animation__card--right'>
                                        <Image src={creditCardRight} alt="tarjeta rota" layout="responsive" />
                                    </div>
                                    <div className='animation__circle'></div>
                                </div>
                            </>
                        :
                            <>
                                <h1>Transacción en proceso</h1>
                                <Spinner width={40} height={40} color={colors.primary}/>
                            </>
                }

                {
                    webhook.data && webhook.data.transaction.status != TRANSACTION_STATUS.incomplete
                     ?
                        <Link href="/user/pedidos">
                            <a>ir a tus pedidos</a>
                        </Link>
                     : ""
                }

            </section>
            <style jsx>{style}</style>
        </UserLayout>
    )
}