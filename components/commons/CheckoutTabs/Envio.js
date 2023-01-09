import { useEffect, useState, useRef } from 'react'
import { useUI } from "components/UIcontext"
import { useBuyForm, useDeliveryActions } from "components/BuyformContext"
import { useCommerce } from "components/CommerceContext"
import { getAddressesBy } from 'firebaseApi/firestoreDB/addresses'
import DeliveryDeatils from './EnvioDetails'
import {Loadingtext} from 'components/icons'
import { departments } from 'utils/departments'
import { formatPrice } from 'utils'
import { deliveryCosts } from 'utils/delivery-cost'

import style from './style'

export default function EnvioTab({handlerNext}){
    const [selectorState, setSelectorState] = useState('loading')
    const [cities, setCities ] = useState([])
    const namesRef = useRef(null)
    const cedulaRef = useRef(null)
    const telefonoRef = useRef(null)
    const { uid, userName, phoneNumber, ucedula, openDisplayBlockWindow, closeDisplayBlockWindow } = useUI() 

    const {render,
           names,
           cedula,
           phone,
           department,
           city,
           address,
           addressComplement,
           neighborhood,
           nextToAddress,
           namesWrong,
           cedulaWrong,
           telefonoWrong,
           departamentoWrong,
           ciudadWrong,
           direccionWrong,
           barrioWrong,
           addresses,
           addressFromSelector,
           setNames,
           setCedula,
           setPhone,
           setDepartment,
           setCity,
           setAddress,
           setAddressComplement,
           setNeighborhood,
           setNextToAddress,
           setNamesWrong,
           setCedulaWrong,
           setTelefonoWrong,
           setDepartamentoWrong,
           setCiudadWrong,
           setDireccionWrong,
           setBarrioWrong,
           setAddresses,
           setAddressFromSelector,
           clearAddressOfDb,
           setRender
    } = useBuyForm()

    const {
        deliveryCost,
        setDeliveryCost,
        setTotalToPay
    } = useCommerce()

    const { validateAndSave, setAddressOf_DB } = useDeliveryActions()

    useEffect( () => {
        if(render === 0){
            setNames(userName)
            if( phoneNumber) setPhone(phoneNumber)
            if(ucedula) setCedula(ucedula)
        }
        setRender()
    },[])

    useEffect( () => {
        getAddressesBy(uid).then( uAddress => {
            const setSelect = uAddress.length === 0 ? 'nothing' : uAddress[0].id
            setAddresses(uAddress)
            setSelectorState(setSelect)
            if(uAddress.length >= 1){
                setAddressOf_DB(uAddress[0])
                setAddressFromSelector(true)
            }
        })
    }, [uid])

    useEffect(()=>{
        if(city && department){
           const citiesOfDepartment = deliveryCosts.find(depto => depto.departamento === department)
           const cityDeliveryCost = citiesOfDepartment.ciudades?.find(currentCity => currentCity.name === city)
           setDeliveryCost(cityDeliveryCost.delivery)
           setTotalToPay()
        }
    },[city])

    const handlerForm = e =>{
        e.preventDefault()
        if(e.target.name === "nombres"){
            setNames(e.target.value)
            if(namesWrong) setNamesWrong(false)
        } 
        if(e.target.name === "cedula"){
            setCedula(e.target.value)
            if(cedulaWrong) setCedulaWrong(false)
        } 
        if(e.target.name === "telefono"){
            setPhone(e.target.value)
            if(telefonoWrong) setTelefonoWrong(false)
        }    
    } 

    const handlerAddressForm = e =>{
        if(e.target.name === 'departamento'){
            const depSelected = e.target.value
            const cius = depSelected === '' 
                         ?  {ciudades:[]} 
                         : departments.find( dep => dep.departamento === depSelected)

            setDepartment(depSelected)
            setCities( cius.ciudades )
            if(departamentoWrong) setDepartamentoWrong(false)
        } 
        if(e.target.name === 'ciudad'){
            setCity(e.target.value)
            if(ciudadWrong) setCiudadWrong(false)
        } 
        if(e.target.name === 'direccion'){
            setAddress(e.target.value)
            if(direccionWrong) setDireccionWrong(false)
        }
        if(e.target.name === 'direccioncomplemento') setAddressComplement(e.target.value)
        if(e.target.name === 'barrio'){
            setNeighborhood(e.target.value)
            if(barrioWrong) setBarrioWrong(false)
        }
        if(e.target.name === 'referenciaDireccion') setNextToAddress(e.target.value)
    }

    const changeAddress = (event)=>{
        const selected = event.target.value
        setSelectorState(selected)
        if(selected !== 'agregar'){
            const addresSelected = addresses.find(direction => direction.id === selected)
            setAddressOf_DB(addresSelected)
            setAddressFromSelector(true)
        }
        if(selected === 'agregar'){
            setAddressFromSelector(false)
            clearAddressOfDb()
        }
    }

    const handlerSubmit = e => {
        e.preventDefault()
        openDisplayBlockWindow()

        validateAndSave()
            .then( () => setTotalToPay() )
            .then( () => handlerNext() )
            .catch( err => {
                console.error({err})
                closeDisplayBlockWindow()
            })
    }

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
                        <div className={`form-controller ${departamentoWrong ? "wrong" : ""}`}>
                            <label htmlFor="departamento">Departamento*</label>   
                            <select className="input input-primary" name="departamento" id="departamento"  value={department} onChange={handlerAddressForm} required>
                                <option value="">Departamento</option>
                                { departments.map( dep => <option key={dep.id} value={dep.departamento}>{dep.departamento}</option>) }
                            </select>
                        </div>

                        <div className={`form-controller ${ciudadWrong ? "wrong" : ""}`}>
                            <label htmlFor="ciudad">Ciudad / Municipio*</label>   
                            <select className="input input-primary" name="ciudad" id="ciudad"  value={city} onChange={handlerAddressForm} required>
                                <option value="">Ciudad</option>
                                { cities.map( city => <option key={city} value={city}>{city}</option> ) }
                            </select>
                        </div>

                        <div className={`form-controller ${direccionWrong ? "wrong" : ""}`}>
                            <label htmlFor="direccion">Dirección*</label>   
                            <input className="input input-primary" type="text" name="direccion" id="direccion"  value={address} onChange={handlerAddressForm} required/>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="direccioncomplemento">Unidad, Apartamento, bloque...</label>   
                            <input className="input input-primary" type="text" name="direccioncomplemento" id="direccioncomplemento" value={addressComplement} onChange={handlerAddressForm} />
                        </div>

                        <div className={`form-controller ${barrioWrong ? "wrong" : ""}`}>
                            <label htmlFor="barrio">Barrio*</label>   
                            <input className="input input-primary" type="text" name="barrio" id="barrio"  value={neighborhood} onChange={handlerAddressForm} required/>
                        </div>

                        <div className="form-controller">
                            <label htmlFor="referenciaDireccion">Lugar de referencia</label>   
                            <input className="input input-primary" type="text" name="referenciaDireccion" id="referenciaDireccion" value={nextToAddress} onChange={handlerAddressForm} />
                        </div>
                     </div>

    let selectOrForm, showToUser = <Loadingtext/>

    if(addresses !== undefined){
         selectOrForm = addresses.length > 0 ? selector : formEnvio
    }

    const detailsEnvio = addressFromSelector ? <DeliveryDeatils/> : ''


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
                    <div className={`form-controller ${namesWrong ? "wrong" : ""}`}>
                        <label htmlFor="nombres">Nombre completo*</label>
                        <input className="input input-primary" value={names} onChange={handlerForm} type="text" name="nombres" id="nombres" ref={namesRef} required/>
                    </div> 

                    <div className={`form-controller ${cedulaWrong ? "wrong" : ""}`}>
                        <label htmlFor="cedula">Cédula*</label>   
                        <input className="input input-primary" value={cedula} onChange={handlerForm} type="number" name="cedula" id="cedula" ref={cedulaRef} required/>
                    </div>

                    <div className={`form-controller ${telefonoWrong ? "wrong" : ""}`}>
                        <label htmlFor="telefono">Teléfono*</label>   
                        <input className="input input-primary" value={phone} onChange={handlerForm} type="number" name="telefono" id="telefono" ref={telefonoRef} required/>
                    </div>
                </div>

                <div className="envio-container">
                    <h1>Datos de envío</h1>
                    { selectOrForm }
                    { showToUser }
                    <p>
                        Costo del envio: { formatPrice(deliveryCost) }
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