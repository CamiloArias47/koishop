import { useEffect, useState } from "react";
import { authChanged } from 'firebase/client'
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