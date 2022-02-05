import { Avatar } from 'components/commons/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logout } from 'firebaseApi/client'
import style from './style'

export default function UserMenu(){

    const router = useRouter()

    const singOut = ()=>{
        logout().then( ()=>{
            router.push('/')
        })
        .catch( error => {
            console.log({error})
        })
    }

    return(
        <div className="user-menu-container">
            <div className="user-profile-info">
                <Avatar width="100" height="100" showName/>
            </div>
            <div className="user-options-list">
                <ul>
                    <Link href="/user">
                        <li className={router.pathname === '/user'  ? 'active' : ''}>
                                <a>Mi cuenta</a>
                        </li>
                    </Link>
                    <Link href="/user/pedidos">
                        <li className={router.pathname === '/user/pedidos' ? 'active' : ''}>
                                <a>Pedidos</a>
                        </li>
                    </Link>
                    <Link href="/user/password">
                        <li className={router.pathname === '/user/password' ? 'active' : ''}>
                                <a>Cambiar contraseña</a>
                        </li>
                    </Link>
                    <li>
                        <a onClick={singOut}>Cerrar sesión</a>
                    </li>
                </ul>
            </div>

            <style jsx>{style}</style>
        </div>
    )
}