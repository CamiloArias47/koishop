import React, { useCallback, useMemo } from 'react'
import { useUI } from 'components/UIcontext'
import { updateBillWithPersonAndAddress } from 'firebaseApi/firestoreDB/bill'
import { setAdrress } from 'firebaseApi/firestoreDB/addresses'
import {
  updateUCedula,
  updatePhone
} from 'firebaseApi/firestoreDB/user'

const initialState = {
  reference: undefined,
  code: undefined,
  render: 0,
  names: '',
  cedula: '',
  phone: '',
  department: '',
  city: '',
  addresses: undefined,
  addressId: '',
  address: '',
  addressComplement: '',
  neighborhood: '',
  nextToAddress: '',
  namesWrong: false,
  cedulaWrong: false,
  telefonoWrong: false,
  departamentoWrong: false,
  ciudadWrong: false,
  direccionWrong: false,
  barrioWrong: false,
  addressFromSelector: false
}

export const BuyFormContext = React.createContext(initialState)
BuyFormContext.displayName = BuyFormContext

function reducer (state, action) {
  switch (action.type) {
    case 'render' : {
      return { ...state, render: state.render + 1 }
    }
    case 'names' : {
      return { ...state, names: action.payload }
    }
    case 'cedula' : {
      return { ...state, cedula: action.payload }
    }
    case 'phone' : {
      return { ...state, phone: action.payload }
    }
    case 'department' : {
      return { ...state, department: action.payload }
    }
    case 'city' : {
      return { ...state, city: action.payload }
    }
    case 'address' : {
      return { ...state, address: action.payload }
    }
    case 'addressComplement' : {
      return { ...state, addressComplement: action.payload }
    }
    case 'neighborhood' : {
      return { ...state, neighborhood: action.payload }
    }
    case 'nextToAddress' : {
      return { ...state, nextToAddress: action.payload }
    }
    case 'reference' : {
      return { ...state, reference: action.payload }
    }
    case 'code' : {
      return { ...state, code: action.payload }
    }
    case 'namesWrong' : {
      return { ...state, namesWrong: action.payload }
    }
    case 'cedulaWrong' : {
      return { ...state, cedulaWrong: action.payload }
    }
    case 'telefonoWrong' : {
      return { ...state, telefonoWrong: action.payload }
    }
    case 'departamentoWrong' : {
      return { ...state, departamentoWrong: action.payload }
    }
    case 'ciudadWrong' : {
      return { ...state, ciudadWrong: action.payload }
    }
    case 'direccionWrong' : {
      return { ...state, direccionWrong: action.payload }
    }
    case 'barrioWrong' : {
      return { ...state, barrioWrong: action.payload }
    }
    case 'addresses' : {
      return { ...state, addresses: action.payload }
    }
    case 'serAddressOfDb' : {
      return {
        ...state,
        department: action.payload.department,
        city: action.payload.city,
        address: action.payload.address,
        addressComplement: action.payload.addresscomplement,
        neighborhood: action.payload.neighborhood,
        nextToAddress: action.payload.nextToAddress,
        addressId: action.payload.id
      }
    }
    case 'clearAddressOfDb' : {
      return {
        ...state,
        department: '',
        city: '',
        address: '',
        addressComplement: '',
        neighborhood: '',
        nextToAddress: '',
        addressId: ''
      }
    }
    case 'addressFromSelector' : {
      return { ...state, addressFromSelector: action.payload }
    }
    case 'addressId' : {
      return { ...state, addressId: action.payload }
    }
  }
}

export const BuyFormProvider = ({ ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const setRender = useCallback(
    () => { dispatch({ type: 'render' }) },
    []
  )

  const setNames = useCallback(
    payload => {
      dispatch({ type: 'names', payload })
    },
    [dispatch]
  )

  const setCedula = useCallback(
    payload => {
      dispatch({ type: 'cedula', payload })
    },
    [dispatch]
  )

  const setPhone = useCallback(
    payload => {
      dispatch({ type: 'phone', payload })
    },
    [dispatch]
  )

  const setDepartment = useCallback(
    payload => {
      dispatch({ type: 'department', payload })
    },
    [dispatch]
  )

  const setCity = useCallback(
    payload => {
      dispatch({ type: 'city', payload })
    },
    [dispatch]
  )

  const setAddress = useCallback(
    payload => {
      dispatch({ type: 'address', payload })
    },
    [dispatch]
  )

  const setAddressComplement = useCallback(
    payload => {
      dispatch({ type: 'addressComplement', payload })
    },
    [dispatch]
  )

  const setNeighborhood = useCallback(
    payload => {
      dispatch({ type: 'neighborhood', payload })
    },
    [dispatch]
  )

  const setNextToAddress = useCallback(
    payload => {
      dispatch({ type: 'nextToAddress', payload })
    },
    [dispatch]
  )

  const setReference = useCallback(
    payload => {
      dispatch({ type: 'reference', payload })
    },
    [dispatch]
  )

  const setCode = useCallback(
    payload => {
      dispatch({ type: 'code', payload })
    },
    [dispatch]
  )

  const setNamesWrong = useCallback(
    payload => {
      dispatch({ type: 'namesWrong', payload })
    },
    [dispatch]
  )
  const setCedulaWrong = useCallback(
    payload => {
      dispatch({ type: 'cedulaWrong', payload })
    },
    [dispatch]
  )
  const setTelefonoWrong = useCallback(
    payload => {
      dispatch({ type: 'telefonoWrong', payload })
    },
    [dispatch]
  )
  const setDepartamentoWrong = useCallback(
    payload => {
      dispatch({ type: 'departamentoWrong', payload })
    },
    [dispatch]
  )
  const setCiudadWrong = useCallback(
    payload => {
      dispatch({ type: 'ciudadWrong', payload })
    },
    [dispatch]
  )
  const setDireccionWrong = useCallback(
    payload => {
      dispatch({ type: 'direccionWrong', payload })
    },
    [dispatch]
  )
  const setBarrioWrong = useCallback(
    payload => {
      dispatch({ type: 'barrioWrong', payload })
    },
    [dispatch]
  )

  const setAddresses = useCallback(
    payload => {
      dispatch({ type: 'addresses', payload })
    },
    [dispatch]
  )

  const setAddressOfDB = useCallback(
    payload => {
      dispatch({ type: 'serAddressOfDb', payload })
    },
    [dispatch]
  )

  const setAddressFromSelector = useCallback(
    payload => {
      dispatch({ type: 'addressFromSelector', payload })
    },
    [dispatch]
  )

  const setAddressId = useCallback(
    payload => {
      dispatch({ type: 'addressId', payload })
    },
    [dispatch]
  )

  const clearAddressOfDb = useCallback(
    payload => {
      dispatch({ type: 'clearAddressOfDb', payload })
    },
    [dispatch]
  )

  const value = useMemo(
    () => ({
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
      setCode,
      setNamesWrong,
      setCedulaWrong,
      setTelefonoWrong,
      setDepartamentoWrong,
      setCiudadWrong,
      setDireccionWrong,
      setBarrioWrong,
      setAddresses,
      setAddressOfDB,
      setAddressFromSelector,
      setAddressId,
      clearAddressOfDb
    }),
    [state]
  )

  return <BuyFormContext.Provider value={value} {...props}/>
}

export const useBuyForm = () => {
  const context = React.useContext(BuyFormContext)
  if (context === undefined) {
    throw new Error('useBuyForm must be used within a BuyFormContext')
  }
  return context
}

export const useDeliveryActions = () => {
  const context = useBuyForm()

  const {
    names, cedula, phone, department, city, address, addressComplement,
    nextToAddress, neighborhood, reference, setAddressOfDB,
    setDepartamentoWrong, setCiudadWrong,
    setDireccionWrong, setBarrioWrong, setTelefonoWrong,
    setCedulaWrong, setNamesWrong, addressId
  } = context

  const { uid, phoneNumber, ucedula } = useUI()

  const validateAddress = () => {
    if (!department || !city || !address || !neighborhood) {
      if (!department) setDepartamentoWrong(true)
      if (!city) setCiudadWrong(true)
      if (!address) setDireccionWrong(true)
      if (!neighborhood) setBarrioWrong(true)
      return false
    }
    return true
  }

  const validateBill = () => {
    if (!names || !cedula || !phone) {
      if (!phone) setTelefonoWrong(true)
      if (!cedula) setCedulaWrong(true)
      if (!names) setNamesWrong(true)

      return false
    }

    return true
  }

  const saveAddres = async () => {
    if (addressId === '') {
      const newAddress = await setAdrress({
        address,
        addresscomplement: addressComplement,
        city,
        department,
        neighborhood,
        nextToAddress,
        uid
      })
      return newAddress.aid
    } else {
      return addressId
    }
  }

  const validateAndSave = () => {
    const person = {
      bid: reference,
      name: names,
      nationalIdentification: cedula,
      phone,
      address: addressId
    }

    const validateAll = new Promise((resolve, reject) => {
      const vldtAddress = validateAddress()
      const vldtBill = validateBill()

      if (!vldtBill || !vldtAddress) {
        reject(new Error('incomplete fields', { cause: 'verifica que los campos obligatorios esten completos' }))
        return false
      }
      resolve(true)
    })

    return validateAll
      .then(() => saveAddres())
      .then(aid => { return { ...person, aid } })
      .then(personBill => updateBillWithPersonAndAddress(personBill))
      .then(() => {
        if (!ucedula) updateUCedula({ uid, ucedula: cedula })
        if (!phoneNumber) updatePhone({ uid, phoneNumber: phone })
        return { process: 'validated and saved successfuly' }
      })
  }

  const setAddressFromDB = (addressDB) => {
    setAddressOfDB(addressDB)
  }

  return {
    validateAddress,
    validateBill,
    validateAndSave,
    setAddressFromDB
  }
}

export const ManagedBuyFormContext = ({ children }) => (
    <BuyFormProvider>
      { children }
    </BuyFormProvider>
)
