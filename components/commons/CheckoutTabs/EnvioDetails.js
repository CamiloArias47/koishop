export default function DeliveryDeatils({currentAddress}){
    const {address,
           addresscomplement,
           city, 
           department,
           id,
           identification,
           lastnames,
           names,
           neighborhood,
           phone,
           reference,
           uid} = currentAddress
    //console.log({address})
    return(
        <div>
            <div><b>Departamento: </b>{department}</div>
            <div><b>Ciudad: </b>{city}</div>
            <div><b>Barrio: </b>{neighborhood}</div>
            <div><b>Dirección: </b>{address}</div>
            <div><b>Complemento: </b>{addresscomplement}</div>
            <div><b>Punto de referencia: </b>{reference}</div>
        </div>
    )
}