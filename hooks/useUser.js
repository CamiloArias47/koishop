import { useEffect } from "react";
import { authChanged } from 'firebaseApi/client'
import { useUI } from 'components/UIcontext'

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
}

export default function useUser(){

    const { setUserAvatar } = useUI()
    
    useEffect( () => {
        authChanged(setUserAvatar)
    },[])
}