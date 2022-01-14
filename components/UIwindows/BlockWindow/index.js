import { useEffect, useState } from 'react'
import { Spinner } from 'components/icons'
import style from './style'

export const BlockWindow = () => {

    const [opacity, setOpacity ] = useState(0)

    useEffect( () => {
        setOpacity(1)
    },[])

    return <div className="block-window" style={{opacity}}>
                <div className='spinner-wrapper'>
                    <Spinner width={38} height={38} />
                </div>
                <style jsx>{style}</style>
            </div>
} 