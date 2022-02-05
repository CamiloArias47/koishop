import { logout } from 'firebaseApi/client'
import { useUI } from 'components/UIcontext'
import { useRouter } from 'next/router'
import style from './style-user'

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
            <ul className='ul-user-sidebar'>
                <li>
                    <a onClick={()=>{handlerClick('/user')} }>Mi Cuenta</a>
                </li>
                <li>
                    <a onClick={()=>{handlerClick('/user/pedidos')} }>Mis Pedidos</a>
                </li>
                <li className='hidde-in-desktop'>
                    <a onClick={()=>{handlerClick('/user/password')} }>Cambiar contraseña</a>
                </li>
                <li>
                    <a onClick={singOut}>Cerrar sesión</a>
                </li>
            </ul>
            <style jsx>{style}</style>
        </div>
    )
}