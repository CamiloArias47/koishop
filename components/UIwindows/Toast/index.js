import { useEffect, useState } from 'react'
import { useUI } from 'components/UIcontext'
import {CloseIcon} from 'components/icons'
import style from './style'

export const Toast = ({title = '', msg = '', position = null}) => {
    const { closeToast } = useUI()
    const [trasnform , setTransform] = useState({transform: 'translateY(8rem)'});

    useEffect( ()=>{
        setTransform({transform: 'translateY(-1rem)'})
    },[msg])

    return(
        <div className="toast-container" style={trasnform}>
            <div className="toast">
                <h3>{title}</h3>
                <p>{msg}</p>
            </div>
            <button className="close-icon" onClick={ () => { closeToast(position) } }>
                <CloseIcon width="20" height="20"/>
            </button>
            <style jsx>{style}</style>
        </div>
    )
}

export const ToastFrame = ({children}) => {
    return(
        <div className='toast-frame'>
            {children}
            <style jsx>{style}</style>
        </div>
    )
}