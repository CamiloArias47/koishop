import { logout } from 'firebaseApi/client'
import { useUI } from 'components/UIcontext'
import { useRouter } from 'next/router'

export const UserSidebar = () => {

    const { closeSidebar } = useUI()
    const router = useRouter()

    const singOut = () => {
        logout().then( ()=>{
            closeSidebar()
            router.push('/')
        })
        .catch( error => {
            console.log({error})
        })
    }

    const handlerClick = route => {
        closeSidebar()
        router.push(route)
    }

    return(
        <div className="user-view-sidebar">
            <ul>
                <li>
                    <a onClick={singOut}>Cerrar sesión</a>
                </li>
                <li>
                    <a onClick={()=>{handlerClick('/user/password')} }>Cambiar contraseña</a>
                </li>
            </ul>
        </div>
    )
}