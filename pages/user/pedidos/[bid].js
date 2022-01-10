import UserLayout from 'components/commons/UserLayout'
import { useUI } from "components/UIcontext"
import { LoadingPedido } from 'components/icons'
import BillDetails from 'components/commons/BillDetails'
import style from './style-bid'

export default function DetailBill({bill}){

    const { uid } = useUI()
    let content

    if(uid === ''){
        content = <div className='wrapper-loading'>
                    <LoadingPedido/>
                  </div>
    }
    else{
        content = (uid !== bill.data.uid) 
                ? 'Pedido no encontrado'
                : <BillDetails bill={bill}/>
    }

    return(
        <UserLayout>
            {content}
            <style jsx>{style}</style>
        </UserLayout>
    )
}


export async function getServerSideProps(context) {
    const {params} = context
    const {bid} = params
    let bill = {exist:false}

    const requestBill = await fetch(`${process.env.URL}/api/bills/bid/${bid}`)

    if(requestBill.ok){
        bill = await requestBill.json()
        bill.data.id = bid

        if(bill.data.promocode){
            const reqCode = await fetch(`${process.env.URL}/api/codes/${bill.data.promocode}`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({uid:bill.data.uid, priceToPay:bill.data.total}) 
              })

            if(reqCode.ok){
                let code = await reqCode.json()
                bill.code = code
            } 
        }
    } 

    return { props: { bill } }
}