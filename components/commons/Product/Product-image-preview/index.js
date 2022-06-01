import { useState } from 'react'
import Image from 'next/image'
import style from './style'

export default function ImagePreview({pics, name, changeImage, current}){

    const [selected, setSelected] = useState(pics[0])
    
    const selectImageHandler = (pic) => {
        setSelected(pic)
        changeImage(pic)
    }

    return(
        <div className='preview'>
            {
                pics.map( pic => {
                    return <button 
                            key={pic} 
                            className={selected === pic ? "preview__element active" : "preview__element" } 
                            onClick={() => { selectImageHandler(pic) }}>
                                <Image 
                                    src={pic}
                                    alt={name}
                                    width={42}
                                    height={42}
                                    layout='responsive'
                                />
                           </button>
                })
            }
            <style jsx>{ style }</style>
        </div>
    )
}