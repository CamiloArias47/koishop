import { useEffect, useState } from 'react'
import { getAddressesBy } from 'firebaseApi/firestoreDB/addresses'
import withAuth from 'HOC/whitAuth'

import { useUI } from 'components/UIcontext'
import UserLayout from 'components/commons/UserLayout'
import AddressCard from 'components/commons/Address-card'

import style from 'styles/style-user-page'

function UserPage () {
  const [addresses, setAddresses] = useState([])
  const { uid, userName, phoneNumber, ucedula } = useUI()

  useEffect(() => {
    getAddressesBy(uid).then(setAddresses)
  }, [uid])

  return (
        <UserLayout>
            <h1>Mi cuenta</h1>
            <h3>Información de la cuenta</h3>
            <p>
                { userName } <br/>
                { ucedula } <br/>
                { phoneNumber }
            </p>
            <h3>Libreta de direcciones</h3>
            <div className='addresslist'>
                {
                    addresses.map(adrs => <AddressCard direction={adrs} key={adrs.id}/>)
                }
            </div>

            <style jsx>{ style }</style>
        </UserLayout>
  )
}

export default withAuth(UserPage)
