import { logout } from 'firebase/client'
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

    const handlerClick = event => {
        event.preventDefault()
        let {href} = event.target
        closeSidebar()
        router.push(href)
    }

    return(
        <div className="user-view-sidebar">
            <ul>
                <li>
                    <a onClick={singOut}>Cerrar sesión</a>
                </li>
                <li>
                    <a href="/user/password" onClick={handlerClick}>Cambiar contraseña</a>
                </li>
            </ul>
        </div>
    )
}