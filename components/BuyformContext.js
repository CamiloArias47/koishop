import React, {useCallback, useMemo} from 'react'

const initialState = {
    reference : undefined,
    render : 0,
    names : '',
    cedula: '',
    phone: '',
    department: '',
    city: '',
    address: '',
    addressComplement : '',
    neighborhood:'',
    nextToAddress:'',
    namesWrong: false,
    cedulaWrong: false,
    telefonoWrong: false,
    departamentoWrong: false,
    ciudadWrong: false,
    direccionWrong: false,
    barrioWrong: false,
}

export const BuyFormContext = React.createContext(initialState)
BuyFormContext.displayName = BuyFormContext

function reducer(state, action){
    switch(action.type){
        case 'render' : {
            return {...state, render : state.render + 1}
        }
        case 'names' : {
            return{...state, names : action.payload}
        }
        case 'cedula' : {
            return{...state, cedula : action.payload}
        }
        case 'phone' : {
            return{...state, phone : action.payload}
        } 
        case 'department' : {
            return{...state, department : action.payload}
        }
        case 'city' : {
            return{...state, city : action.payload}
        }
        case 'address' : {
            return{...state, address : action.payload}
        } 
        case 'addressComplement' : {
            return{...state, addressComplement : action.payload}
        }
        case 'neighborhood' : {
            return{...state, neighborhood : action.payload}
        }
        case 'nextToAddress' : {
            return{...state, nextToAddress : action.payload}
        }
        case 'reference' : {
            return{...state, reference : action.payload}
        }
        case 'namesWrong' : {
            return{...state, namesWrong : action.payload}
        }
        case 'cedulaWrong' : {
            return{...state, cedulaWrong : action.payload}
        }
        case 'telefonoWrong' : {
            return{...state, telefonoWrong : action.payload}
        }
        case 'departamentoWrong' : {
            return{...state, departamentoWrong : action.payload}
        }
        case 'ciudadWrong' : {
            return{...state, ciudadWrong : action.payload}
        }
        case 'direccionWrong' : {
            return{...state, direccionWrong : action.payload}
        }
        case 'barrioWrong' : {
            return{...state, barrioWrong : action.payload}
        }
    }
}

export const BuyFormProvider = ({...props}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const setRender = useCallback(
        () => { dispatch({type:'render'}) },
        []
    )

    const setNames = useCallback(
        payload => { 
            dispatch({type:'names', payload}) },
        [dispatch]
    )

    const setCedula = useCallback(
        payload => { 
            dispatch({type:'cedula', payload}) },
        [dispatch]
    )

    const setPhone = useCallback(
        payload => { 
            dispatch({type:'phone', payload}) },
        [dispatch]
    )

    const setDepartment = useCallback(
        payload => { 
            dispatch({type:'department', payload}) },
        [dispatch]
    )

    const setCity = useCallback(
        payload => { 
            dispatch({type:'city', payload}) },
        [dispatch]
    ) 

    const setAddress = useCallback(
        payload => { 
            dispatch({type:'address', payload}) },
        [dispatch]
    )

    const setAddressComplement = useCallback(
        payload => { 
            dispatch({type:'addressComplement', payload}) },
        [dispatch]
    )

    const setNeighborhood = useCallback(
        payload => { 
            dispatch({type:'neighborhood', payload}) },
        [dispatch]
    )

    const setNextToAddress = useCallback(
        payload => { 
            dispatch({type:'nextToAddress', payload}) },
        [dispatch]
    )

    const setReference = useCallback(
        payload => { 
            dispatch({type:'reference', payload}) },
        [dispatch]
    )

    const setNamesWrong = useCallback(
        payload => { 
            dispatch({type:'namesWrong', payload}) },
        [dispatch]
    )
    const setCedulaWrong = useCallback(
        payload => { 
            dispatch({type:'cedulaWrong', payload}) },
        [dispatch]
    )
    const setTelefonoWrong = useCallback(
        payload => { 
            dispatch({type:'telefonoWrong', payload}) },
        [dispatch]
    )
    const setDepartamentoWrong = useCallback(
        payload => { 
            dispatch({type:'departamentoWrong', payload}) },
        [dispatch]
    )
    const setCiudadWrong = useCallback(
        payload => { 
            dispatch({type:'ciudadWrong', payload}) },
        [dispatch]
    )
    const setDireccionWrong = useCallback(
        payload => { 
            dispatch({type:'direccionWrong', payload}) },
        [dispatch]
    )
    const setBarrioWrong = useCallback(
        payload => { 
            dispatch({type:'barrioWrong', payload}) },
        [dispatch]
    )

    const value= useMemo(
        ()=>({
            ...state,
            setRender,
            setCedula,
            setNames,
            setDepartment,
            setPhone,
            setCity,
            setAddressComplement,
            setAddress,
            setNeighborhood,
            setNextToAddress,
            setReference,
            setNamesWrong,
            setCedulaWrong,
            setTelefonoWrong,
            setDepartamentoWrong,
            setCiudadWrong,
            setDireccionWrong,
            setBarrioWrong,
        }),
        [state]
    )

    return <BuyFormContext.Provider value={value} {...props}/>
}



export const useBuyForm = () => {
    const context = React.useContext(BuyFormContext)
    if (context === undefined) {
      throw new Error(`useBuyForm must be used within a BuyFormContext`)
    }
    return context
}


export const useDeliveryActions = () => {

    const context = useBuyForm()

    const validateAddress = () => {

        const {
            department, city, address, neighborhood,
            setDepartamentoWrong, setCiudadWrong, setDireccionWrong,
            setBarrioWrong 
        } = context

        if(!department || !city || !address || !neighborhood){
            if(!department) setDepartamentoWrong(true)
            if(!city) setCiudadWrong(true)
            if(!address) setDireccionWrong(true)
            if(!neighborhood) setBarrioWrong(true)
            return false
        }
        return true
    }

    const validateBill = () => {
        const {
            names, cedula, phone, setTelefonoWrong, setCedulaWrong, setNamesWrong
        } = context

        if(!names || !cedula || !phone ){
            if(!phone) setTelefonoWrong(true)
            if(!cedula) setCedulaWrong(true)
            if(!names) setNamesWrong(true) 

            return false
        }

        return true
    }

    return {
        validateAddress,
        validateBill
    }
}



export const ManagedBuyFormContext = ({ children }) => (
    <BuyFormProvider>
      { children }
    </BuyFormProvider>
)