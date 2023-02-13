import { useEffect } from 'react'
import { authChanged } from 'firebaseApi/auth/userState'
import { useUI } from 'components/UIcontext'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const { setUserAvatar } = useUI()

  useEffect(() => {
    authChanged(setUserAvatar)
  }, [])
}
