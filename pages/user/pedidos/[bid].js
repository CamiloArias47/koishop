import UserLayout from 'components/commons/UserLayout'

export default function Success({bill}){
    return(
        <UserLayout>
            Pago exitoso {bill.data.id}
        </UserLayout>
    )
}


export async function getServerSideProps(context) {
    const {params} = context
    const {bid} = params
    let bill = {exist:false}

    const requestBill = await fetch(`${process.env.URL}/api/bills/${bid}`)

    if(requestBill.ok){
        bill = await requestBill.json()
        bill.data.id = bid
    } 


    console.log({bill})
    return { props: { bill } }
}