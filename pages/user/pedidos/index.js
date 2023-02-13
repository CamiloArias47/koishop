import { useEffect, useState } from 'react'
import withAuth from 'HOC/whitAuth'
import Link from 'next/link'
import Image from 'next/image'
import { useUI } from 'components/UIcontext'
import { getBillsByUser } from 'firebaseApi/firestoreDB/bill'
import UserLayout from 'components/commons/UserLayout'
import { formatPrice, formatDate } from 'utils'
import { TRANSACTION_STATUS_SHOW_NAME, STATUS_ICON } from 'components/CommerceContext'
import style from 'styles/global-table'
import stylepage from 'styles/style-user-bills'
import paymentInvoiceImg from 'public/images/logos/payments-invoices-32.svg'

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const { uid } = useUI()

  useEffect(() => {
    if (uid !== '') {
      getBillsByUser({ uid })
        .then(data => setPedidos(data))
    }
  }, [uid])

  return (
        <UserLayout>
            <h1>Mis Pedidos</h1>
            <div className='grid'>
                {
                    pedidos.map(ped =>
                        <Link href={`/user/pedidos/${ped.id}`} key={ped.id}>
                            <div className='billcard'>
                                <div className='billcard_header'>
                                    <Image
                                        src={paymentInvoiceImg}
                                        alt="payment"
                                        width={18}
                                    />
                                    <div>
                                        Pedido: <span className='billcard_code'>{ped.code || ped.id}</span>
                                    </div>
                                </div>
                                <div className='billcard_body'>
                                    <span className='billcard_price'>
                                        { ped.total ? formatPrice(ped.total) : 'Sin pago' }
                                    </span>
                                    <span className='billcard_date'>
                                        {
                                            (ped.timestampEnvioStep)
                                              ? formatDate(ped.timestampEnvioStep.seconds)
                                              : formatDate(ped.timestamp.seconds)
                                        }
                                    </span>
                                </div>
                                <div className='billcard_footer'>
                                    <span className={'billcard_badgestatus ' + ped.status}>
                                        { STATUS_ICON[ped.status] }
                                    </span>
                                    <span className={'billcard_status ' + ped.status}>
                                        { TRANSACTION_STATUS_SHOW_NAME[ped.status] }
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div >
            <style jsx>{ style }</style>
            <style jsx>{ stylepage }</style>
        </UserLayout>
  )
}

export default withAuth(Pedidos)
