import { useEffect, useState } from 'react'
import withAuth from 'HOC/whitAuth'
import Link from 'next/link'
import { useUI } from 'components/UIcontext'
import { getBillsByUser } from 'firebaseApi/firestoreDB/bill'
import UserLayout from 'components/commons/UserLayout'

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
            <h1>Pedidos</h1>
            <ul>
                {
                    pedidos.map( ped => 
                        <li key={ped.id}>
                            <Link  href={`/user/pedidos/${ped.id}`}> 
                                <a>{ped.id}</a>
                             </Link> 
                        </li>
                    )
                }
            </ul>
        </UserLayout>
    )
}

export default withAuth(Pedidos)