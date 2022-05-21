import { useEffect, useState } from 'react'
import { useUI } from 'components/UIcontext'
import withAuth from 'HOC/whitAuth'
import { getAddressesBy } from 'firebaseApi/firestoreDB/addresses'
import UserLayout from 'components/commons/UserLayout'
import style from 'styles/style-user-page'


function UserPage() {
    const [ addresses, setAddresses ] = useState([])
    const { uid, userName, phoneNumber, ucedula } = useUI()

    useEffect( () => {
        getAddressesBy(uid).then( setAddresses )
    }, [uid])

    return(
        <UserLayout>
            <h1>Mi cuenta</h1>
            <h3>Información de la cuenta</h3>
            <p>
                { userName } <br/>
                { ucedula } <br/>
                { phoneNumber }
            </p>
            <h3>Libreta de direcciones</h3>
            {
                addresses.map( adrs => { 
                    return <div key={adrs.id}>
                                <b>{ adrs.address }</b><br/>
                                { adrs.addresscomplement }<br/>
                                { adrs.department } - { adrs.city }<br/> 
                                { adrs.neighborhood } <br/> 
                                { adrs.nextToAddress } <br/> 
                           </div>
                })
            }

            <style jsx>{ style }</style>
        </UserLayout>
    ) 
}

export default withAuth(UserPage)