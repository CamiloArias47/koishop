import React, {useCallback, useMemo} from 'react'

const initialState = {
    reference : undefined,
    render : 0,
    names : ' ',
    cedula: '',
    phone: '',
    department: '',
    city: '',
    address: '',
    addressComplement : '',
    neighborhood:'',
    nextToAddress:''
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
            setReference
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

export const ManagedBuyFormContext = ({ children }) => (
    <BuyFormProvider>
      { children }
    </BuyFormProvider>
)