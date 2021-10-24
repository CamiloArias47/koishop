import { useEffect, useState } from 'react'
import { useUI } from "components/UIcontext"
//import { getUser } from "firebaseApi/firestoreDB/user"
import { getAddressesBy } from 'firebaseApi/firestoreDB/addresses'
import DeliveryDeatils from './EnvioDetails'
import {Loadingtext} from 'components/icons'

import style from './style'

export default function EnvioTab({handlerNext}){
    const [addresses, setAddresses] = useState()
    const [nombres, setName] = useState('')
    const [cedula, setCedula] = useState('')
    const [telefono, setTelefono] = useState('')
    const [addressChose, setAddressChose] = useState({})
    const [selectorState, setSelectorState] = useState('loading')
    const { uid, userName, phoneNumber  } = useUI() 

    useEffect( () => {
        setName(userName)
        if(phoneNumber) setTelefono(phoneNumber)
    },[])

    useEffect( () => {
        getAddressesBy(uid).then( uAddress => {
            const setSelect = uAddress.length === 0 ? 'nothing' : uAddress[0].id
            setAddresses(uAddress)
            setAddressChose(uAddress[0])
            setSelectorState(setSelect)
        })
    }, [uid])

    const handlerForm = e =>{
        e.preventDefault()
        if(e.target.name === "nombres") setName(e.target.value)
        if(e.target.name === "cedula") setCedula(e.target.value)
        if(e.target.name === "telefono") setTelefono(e.target.value)
    } 

    const changeAddress = (event)=>{
        const selected = event.target.value
        setSelectorState(selected)
        if(selected !== 'agregar'){
            const addresSelected = addresses.find(direction => direction.id == selected)
            setAddressChose(addresSelected)
        }
    }

    const handlerSubmit = e => {
        e.preventDefault()
        //validar datos
        
        handlerNext()
    }

    // console.log('🔥🔥🔥🔥🔥')
    // console.log({addressChose})

    const selector = addresses !== undefined 
                     ? <div className="form-controller">
                            <select value={selectorState} className="input input-primary" 
                                    name="savedAddress" 
                                    onChange={changeAddress}
                                    id="savedAddress" required>

                            {addresses.map(adr => <option key={adr.id} value={adr.id}>{adr.address}</option>)}

                            <option value="agregar">Agregar otra dirección</option>
                        
                            </select> 
                      </div>
                    :''
    
    const formEnvio = <div>
                        <div className="form-controller">
                            <label htmlFor="departamento">Departamento</label>   
                            <select className="input input-primary" name="departamento" id="departamento" required>
                                <option value="valle">Valle</option>
                                <option value="Antioquia">Antioquia</option>
                                <option value="Cauca">Cauca</option>
                            </select>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="departamento">Ciudad / Municipio</label>   
                            <select className="input input-primary" name="departamento" id="departamento" required>
                                <option value="Cali">Cali</option>
                                <option value="Palmira">Palmira</option>
                                <option value="Jamundi">Jamundi</option>
                            </select>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="direccion">Dirección</label>   
                            <input className="input input-primary" type="text" name="direccion" id="direccion" required/>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="direccioncomplemento">Unidad, Apartamento, bloque...</label>   
                            <input className="input input-primary" type="text" name="direccioncomplemento" id="direccioncomplemento" required/>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="barrio">Barrio</label>   
                            <input className="input input-primary" type="text" name="barrio" id="barrio" required/>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="referenciaDireccion">Lugar de referencia</label>   
                            <input className="input input-primary" type="text" name="referenciaDireccion" id="referenciaDireccion" required/>
                        </div>
                     </div>

    let selectOrForm, showToUser = <Loadingtext/>

    if(addresses !== undefined){
         selectOrForm = addresses.length > 0 ? selector : formEnvio
    }

    const detailsEnvio = (addressChose !== undefined) ? <DeliveryDeatils currentAddress={addressChose}/> : ''


    if(selectorState === 'nothing') {
        showToUser = ''
    }
    else if(selectorState !== 'loading'){
        showToUser = (selectorState === 'agregar') ? formEnvio : detailsEnvio
    }

    return(
        <div>
            <form>
                <div className="facturacion-container">
                    <h1>Detalles de facturación</h1>
                    <div className="form-controller">
                        <label htmlFor="nombres">Nombre completo</label>
                        <input className="input input-primary" value={nombres} onChange={handlerForm} type="text" name="nombres" id="nombres" required/>
                    </div> 

                    <div className="form-controller">
                        <label htmlFor="cedula">Cédula</label>   
                        <input className="input input-primary" value={cedula} onChange={handlerForm} type="number" name="cedula" id="cedula" required/>
                    </div>

                    <div className="form-controller">
                        <label htmlFor="telefono">Teléfono</label>   
                        <input className="input input-primary" value={telefono} onChange={handlerForm} type="number" name="telefono" id="telefono" required/>
                    </div>
                </div>

                <div className="envio-container">
                    <h1>Datos de envío</h1>
                    { selectOrForm }
                    { showToUser }
                    <p>
                        dejar que el usuario seleccione una empresa de envio o definir una y dejasr el precio fijo 
                    </p>
                </div>

                <div className="container-btn-buy">
                    <button className="btn btn-primary btn-buy" onClick={handlerSubmit}>
                            Hacer compra
                    </button>
                </div>

            </form>
            <style jsx>{ style }</style>
        </div>
    )
}