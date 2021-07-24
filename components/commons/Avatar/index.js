import Image from 'next/image'
import style from './style'
import { useUI } from 'components/UIcontext'

export const Avatar = ({ 
    width = 42, 
    height = 42, 
    cb = ()=>{},
    showName = false 
})=>{

    const { userAvatar,
            userName,
            email } = useUI()

    const name = showName 
                    ? !userName 
                        ? <span>{ userName }</span> 
                        : <span>{ email }</span> 
                    : null

    return(
        <div onClick={cb} className="avatar">
            <Image src={userAvatar} 
                   width={width} 
                   height={height} 
                   />
            { name }

            <style jsx>{style}</style>
        </div>
    )
} 