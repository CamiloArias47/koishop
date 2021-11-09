import { useEffect, useState } from "react";

export default function useBill(){

    const setBillId = (bid) => {
        const miLocal = window.localStorage;
        miLocal.setItem('billId',bid)
    }
    
    const getBillId = () => {
    
        const [localBillId, setBillId] = useState(null)
    
        useEffect( () =>{
            const miLocal = window.localStorage;
            const bid = miLocal.getItem('billId')
            setBillId(bid)
        }, [])
    
        return localBillId
    }

    return {
        setBillId,
        getBillId
    }
}


 
// export default getBillId