import { useEffect, useState } from 'react'
import { useBuyForm } from 'components/BuyformContext'

export default function useBill () {
  const { setReference } = useBuyForm()

  const setBillId = (bid) => {
    const now = new Date()
    const miLocal = window.localStorage
    miLocal.setItem('billId', bid)
    miLocal.setItem('billId-timestamp', now)
  }

  const setBillCode = (bcode) => {
    const miLocal = window.localStorage
    miLocal.setItem('billCode', bcode)
  }

  const validateBillId = () => {
    const [localBillId, setBillIdLocal] = useState(null)

    // revisar si hay una referencia en el localstorage (si el usuario inicio un proceso de compra)
    // esto evita que el usuario cree más de una factura en la base de datos para una sola compra
    // solo se le permite crear otra factura si ha pasado un dia desde que inicio una compra (creo factura en base de datos)
    // y no termino el proceso, se le da un día para retomar dicha compra
    useEffect(() => {
      const miLocal = window.localStorage
      const bid = miLocal.getItem('billId')
      setBillIdLocal(bid)

      if (localBillId !== null) {
        const createdBill = new Date(getBillIdTimestamp()).getTime()
        const now = Date.now()
        const diff = (now - createdBill) / 1000
        // Si no ha pasado más de un dia retomamos la factura creada
        if (diff <= 86400) {
          setReference(localBillId)
        } else {
          deleteBill()
          deleteBillTime()
        }
      }
    }, [localBillId])

    return localBillId
  }

  const getBillIdTimestamp = () => {
    const miLocal = window.localStorage
    const btime = miLocal.getItem('billId-timestamp')
    return btime
  }

  const deleteBill = () => {
    const miLocal = window.localStorage
    miLocal.removeItem('billId')
  }

  const deleteLocalCode = () => {
    const miLocal = window.localStorage
    miLocal.removeItem('billCode')
  }

  const deleteBillTime = () => {
    const miLocal = window.localStorage
    miLocal.removeItem('billId-timestamp')
  }

  return {
    setBillId,
    setBillCode,
    validateBillId,
    getBillIdTimestamp,
    deleteBill,
    deleteBillTime,
    deleteLocalCode
  }
}
