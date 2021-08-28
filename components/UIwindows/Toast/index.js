import { useEffect, useState } from 'react'
import { useUI } from 'components/UIcontext'
import {CloseIcon} from 'components/icons'
import style from './style'

export const Toast = ({title = '', msg = ''}) => {
    const { closeToast } = useUI()
    const [trasnform , setTransform] = useState({transform: 'translateY(8rem)'});

    useEffect( ()=>{
        setTransform({transform: 'translateY(-1rem)'})
    },[msg])

    return(
        <div className="toast-container">
            <button className="close-icon" onClick={closeToast}>
                <CloseIcon width="20" height="20"/>
            </button>
            <div className="toast" style={trasnform}>
                <h3>{title}</h3>
                <p>{msg}</p>
            </div>
            <style jsx>{style}</style>
        </div>
    )
}