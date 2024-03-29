import { useEffect } from 'react'
import { useUI } from 'components/UIcontext'
import UserLayout from 'components/commons/UserLayout'
import { LoadingPedido } from 'components/icons'
import BillDetails from 'components/commons/BillDetails'
import style from 'styles/style-bid'

export default function DetailBill ({ bill }) {
  const { uid, closeDisplayBlockWindow } = useUI()

  useEffect(() => {
    closeDisplayBlockWindow()
  }, [])

  let content

  if (uid === '') {
    content = <div className='wrapper-loading'>
                    <LoadingPedido/>
                  </div>
  } else {
    content = (uid !== bill?.data.uid)
      ? 'Pedido no encontrado'
      : <BillDetails bill={bill}/>
  }

  return (
        <UserLayout>
            {content}
            <style jsx>{style}</style>
        </UserLayout>
  )
}

export async function getServerSideProps (context) {
  const { params } = context
  const { bid } = params
  let bill = { exist: false }

  const requestBill = await fetch(`${process.env.URL}/api/bills/bid/${bid}`)

  if (requestBill.ok) {
    bill = await requestBill.json()
    bill.data = { ...bill.data, id: bid }

    if (bill.data.promocode) {
      const reqCode = await fetch(`${process.env.URL}/api/codes/${bill.data.promocode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: bill.data.uid, priceToPay: bill.data.total })
      })

      if (reqCode.ok) {
        const code = await reqCode.json()
        bill.code = code
      }
    }

    if (bill.data.address) {
      const reqAddress = await fetch(`${process.env.URL}/api/address/${bill.data.address}`)
      if (reqAddress.ok) {
        const address = await reqAddress.json()
        bill.addressDetails = address
      }
    }
  }

  return { props: { bill } }
}
