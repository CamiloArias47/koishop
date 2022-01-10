import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUI } from 'components/UIcontext'
import UserLayout from 'components/commons/UserLayout'

export default function Pedidos(){

    const [pedidos, setPedidos] = useState([])
    const { uid } = useUI()


    useEffect( ()=>{
        if(uid !== ''){
            let route = `/api/bills/byuser/${uid}`
            fetch(route)
                .then(res => res.json())
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