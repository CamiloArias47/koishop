import { useBuyForm } from 'components/BuyformContext'

export default function DeliveryDeatils () {
  const {
    address,
    addresscomplement,
    city,
    department,
    neighborhood,
    nextToAddress
  } = useBuyForm()

  return (
        <div>
            <div><b>Departamento: </b>{department}</div>
            <div><b>Ciudad: </b>{city}</div>
            <div><b>Barrio: </b>{neighborhood}</div>
            <div><b>Dirección: </b>{address}</div>
            <div><b>Complemento: </b>{addresscomplement}</div>
            <div><b>Punto de referencia: </b>{nextToAddress}</div>
        </div>
  )
}
