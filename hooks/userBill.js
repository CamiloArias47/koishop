import { useEffect, useState } from "react";

export default function useBill(){

    const setBillId = (bid) => {
        const now = new Date() 
        const miLocal = window.localStorage;
        miLocal.setItem('billId',bid)
        miLocal.setItem('billId-timestamp',now)
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

    const getBillIdTimestamp = () => {
        const miLocal = window.localStorage;
        const btime = miLocal.getItem('billId-timestamp')
    
        return btime
    }

    return {
        setBillId,
        getBillId,
        getBillIdTimestamp
    }
}


 
// export default getBillId