import React, { useCallback, useMemo } from 'react'
import userAvatarLoading from 'public/images/loaders/UserAvatarLoader.svg'
import userLogo from 'public/images/user.svg'

const MODAL_VIEWS = {
    'REGISTER_VIEW': 'registro',
    'LOGIN_VIEW': 'login',
    'FORGOT_VIEW': 'remenber',
    'NEW_SHIPPING_ADDRESS': 'new-shipping-address',
    'NEW_PAYMENT_METHOD': 'new-payment-method'
}

export const SIDEBAR_VIEWS = {
    'CART_VIEW': 'CART_VIEW',
    'CHECKOUT_VIEW': 'CHECKOUT_VIEW',
    'PAYMENT_METHOD_VIEW': 'PAYMENT_METHOD_VIEW',
    'USER' : 'user-view',
    'HAMBURGER' : 'hamburger-view'
}

const initialState = {
    displaySidebar: false,
    displaySidebarRight : false,
    displaySidebarLeft : false,
    sidebarPosition:'right',
    displayDropdown: false,
    displayModal: false,
    displayToast: false,
    toast:{title:'',msg:''},
    modalView: MODAL_VIEWS.LOGIN_VIEW,
    sidebarView: SIDEBAR_VIEWS.CART_VIEW,
    userAvatar: userAvatarLoading,
    userName: '',
    email:'unknow'
}

export const UIContext = React.createContext(initialState)

UIContext.displayName = 'UIContext'

//Funcion del reducer, manejar los estados globales
function uiReducer(state, action) {
    switch (action.type) {
      case 'open-sidebar-from-right': {
        return {
          ...state,
          sidebarPosition : 'right',
          displaySidebar: true,
          displaySidebarRight: true,
          displaySidebarLeft: false,
        }
      }
      case 'open-sidebar-from-left': {
        return {
          ...state,
          sidebarPosition : 'left',
          displaySidebar: true,
          displaySidebarLeft: true,
          displaySidebarRight: false,
        }
      }
      case 'close-sidebar': {
        return {
          ...state,
          displaySidebar: false,
          displaySidebarLeft: false,
          displaySidebarRight: false,
        }
      }
      case 'open-dropdown': {
        return {
          ...state,
          displayDropdown: true,
        }
      }
      case 'close-dropdown': {
        return {
          ...state,
          displayDropdown: false,
        }
      }
      case 'open-modal': {
        return {
          ...state,
          displayModal: true,
          displaySidebar: false,
          displaySidebarLeft: false,
          displaySidebarRight: false,
        }
      }
      case 'close-modal': {
        return {
          ...state,
          displayModal: false,
        }
      }
      case 'open-toast': {
        let {title,msg} = action.data
        return {
          ...state,
          toast:{title,msg},
          displayToast: true
        }
      }
      case 'close-toast': {
        return {
          ...state,
          toast:{title:'',msg:''},
          displayToast: false
        }
      }
      case 'SET_MODAL_VIEW': {
        return {
          ...state,
          modalView: action.view,
        }
      }
      case 'SET_SIDEBAR_VIEW': {
        return {
          ...state,
          sidebarView: action.view,
        }
      }
      case 'SET_USER_AVATAR': {
        let avtr =  action.value 
                      ? action.value.photoURL
                          ? action.value.photoURL
                          : 'https://picsum.photos/62/62' 
                      : userLogo
        return {
          ...state,
          userAvatar: avtr,
        }
      }
      case 'SET_USER' :{
        let avtr = userLogo,
            uName = '',
            email = ''

        if(action.user){
           avtr = !action.user.photoURL ? 'https://picsum.photos/62/62' : action.user.photoURL
           uName = !action.user.displayName ? action.user.email : action.user.displayName,
           email = action.user.email
        } 

        return {
          ...state,
          userName: uName,
          userAvatar : avtr,
          email : email
        }
      }
    }
}

export const UIProvider = (props) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState)
    
    const openSidebarFromRight = useCallback(
      () => {
        disablesEnableScroll(true)
        dispatch({ type: 'open-sidebar-from-right' })
      },
      [dispatch]
    )
    const openSidebarFromLeft = useCallback(
      () => {
        disablesEnableScroll(true)
        dispatch({ type: 'open-sidebar-from-left' })
      },
      [dispatch]
    )
    const closeSidebar = useCallback(
      () =>{
        disablesEnableScroll(false)
        dispatch({ type: 'close-sidebar' })
      },
      [dispatch]
    )
    const toggleSidebar = useCallback(
      () =>
        state.displaySidebar
          ? dispatch({ type: 'close-sidebar' })
          : dispatch({ type: 'open-sidebar' }),
      [dispatch, state.displaySidebar]
    )
    const closeSidebarIfPresent = useCallback(
      () => state.displaySidebar && dispatch({ type: 'open-sidebar' }),
      [dispatch, state.displaySidebar]
    )
    const openDropdown = useCallback(
      () => dispatch({ type: 'open-dropdown' }),
      [dispatch]
    )
    const closeDropdown = useCallback(
      () => dispatch({ type: 'close-dropdown' }),
      [dispatch]
    )
    const openModal = useCallback(
      () => {
        disablesEnableScroll(true)
        dispatch({ type: 'open-modal' })
      },
      [dispatch]
    )
    const closeModal = useCallback(
      () => {
        disablesEnableScroll(false)
        dispatch({ type: 'close-modal' }) 
      },[dispatch]
    )
    const openToast = useCallback(
      (data) => dispatch({ type: 'open-toast', data }),
      [dispatch]
    ) 
    const closeToast = useCallback(
      () => dispatch({type:'close-toast'}), [dispatch]
    )
    const setUserAvatar = useCallback(
      (value) => dispatch({ type: 'SET_USER_AVATAR', value }),
      [dispatch]
    )
    const setModalView = useCallback(
      (view) => dispatch({ type: 'SET_MODAL_VIEW', view }),
      [dispatch]
    )
    const setSidebarView = useCallback(
      (view) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
      [dispatch]
    )
    const disablesEnableScroll = useCallback(
      (open) => {
        document.getElementsByTagName("html")[0].style.overflow = (open) ? "hidden" : "auto"
      }
    )
    const setUser = useCallback(
      (user) => dispatch({ type: 'SET_USER', user}),
      [dispatch]
    )
    const value = useMemo(
      () => ({
        ...state,
        openSidebarFromRight,
        openSidebarFromLeft,
        closeSidebar,
        toggleSidebar,
        closeSidebarIfPresent,
        openDropdown,
        closeDropdown,
        openModal,
        closeModal,
        openToast,
        closeToast,
        setModalView,
        setSidebarView,
        setUserAvatar,
        setUser
      }),
      [state]
    )
  
    return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
    const context = React.useContext(UIContext)
    if (context === undefined) {
      throw new Error(`useUI must be used within a UIProvider`)
    }
    return context
}

export const ManagedUIContext = ({ children }) => (
    <UIProvider>
      { children }
    </UIProvider>
)
  
