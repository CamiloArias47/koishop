import React, {useCallback, useMemo} from 'react'

const initialState = {
    render : 0,
    names : ' ',
    cedula: '',
    phone: '',
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

    const value= useMemo(
        ()=>({
            ...state,
            setRender,
            setCedula,
            setNames,
            setPhone
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