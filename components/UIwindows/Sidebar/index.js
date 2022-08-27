import { useUI } from 'components/UIcontext'
import { CloseIcon } from 'components/icons'
import style from './style'

export const Sidebar = ({children})=>{
    const { sidebarPosition, closeSidebar} = useUI()

    const appearfrom = {
        [sidebarPosition] : 0
    }

    return(
        <div className="slidebar-container">
            <div className="sidebar" style={appearfrom}> 
                { children }
            </div>
            <button className={'close-btn ' + 'close-btn--'+sidebarPosition} onClick={closeSidebar}>
                <CloseIcon width="42" height="42"/>
            </button>
            <style jsx>{style}</style>
        </div>
    )
}