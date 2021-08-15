import { Avatar } from 'components/commons/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { logout } from 'firebase/client'
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
                    <li className={router.pathname === '/user/password' ? 'active' : ''}>
                        <Link href="/user/password">
                            <a>Cambiar contraseña</a>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a onClick={singOut}>Cerrar sesión</a>
                    </li>
                </ul>
            </div>

            <style jsx>{style}</style>
        </div>
    )
}