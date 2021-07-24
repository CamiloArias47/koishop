import style from './style'
import { useUI } from 'components/UIcontext'

export const Sidebar = ({children})=>{
    const { sidebarPosition } = useUI()

    const appearfrom = {
        [sidebarPosition] : 0
    }

    return(
        <div className="slidebar-container">
            <div className="sidebar" style={appearfrom}> 
                { children }
            </div>
            
            <style jsx>{style}</style>
        </div>
    )
}