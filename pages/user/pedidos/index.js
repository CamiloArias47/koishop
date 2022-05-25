import { useEffect, useState } from 'react'
import withAuth from 'HOC/whitAuth'
import Link from 'next/link'
import { useUI } from 'components/UIcontext'
import { getBillsByUser } from 'firebaseApi/firestoreDB/bill'
import UserLayout from 'components/commons/UserLayout'
import { formatPrice } from 'utils'
import {TRANSACTION_STATUS_SHOW_NAME} from 'components/CommerceContext'
import style from 'styles/global-table'
import stylepage from 'styles/style-user-bills'

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])
    const { uid } = useUI()


    useEffect( ()=>{
        if(uid !== ''){
            getBillsByUser({uid})
                .then(data => setPedidos(data) )
        }
    },[uid])

    return(
        <UserLayout>
            <h1>Mis Pedidos</h1>
            <div className='wraper-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Pedido #</th>
                            <th>Total:</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedidos.map( ped => 
                                <tr key={ped.id}>
                                    <td>
                                        <Link  href={`/user/pedidos/${ped.id}`}> 
                                            <a>{ped.code || ped.id}</a>
                                        </Link> 
                                    </td>
                                    <td>
                                        <Link  href={`/user/pedidos/${ped.id}`}> 
                                            <a>{ ped.total ? formatPrice( ped.total ) : 'Sin pago' }</a>
                                        </Link> 
                                    </td>
                                    <td>
                                        <Link  href={`/user/pedidos/${ped.id}`}> 
                                            <a>{ TRANSACTION_STATUS_SHOW_NAME[ped.status] }</a>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <style jsx>{ style }</style>
            <style jsx>{ stylepage }</style>
        </UserLayout>
    )
}

export default withAuth(Pedidos)