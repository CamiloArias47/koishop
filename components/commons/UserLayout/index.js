import UserMenu from './UserMenu'
import style from './style'

export default function UserLayout({ children }){
    return(
        <div className="user-layout">
            <div className="menu-left">
                <UserMenu/>
            </div>
            <div className="container-main">
                { children }
            </div>

            <style jsx>{style}</style>
        </div>
    )
}