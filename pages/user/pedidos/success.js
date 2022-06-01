import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserLayout from 'components/commons/UserLayout'
import { getWebhook } from 'firebaseApi/firestoreDB/webhook'

export default function Success(){
    const router = useRouter()
    const { id } = router.query
    const [webhook, setWebhook] = useState({})

    useEffect( () => {
        async function getterwebhook(){
            let webhk = await getWebhook({id})
            setWebhook(webhk)
        } 

        if(id) getterwebhook()
    },[id])

    return(
        <UserLayout>
            esta es la id
            {id}<br/>
            Este es el webhook:<br/>
            {webhook.data?.transaction.status}
        </UserLayout>
    )
}