import Image from 'next/image'
import style from './style'

export default function ImagePreview({pics, name}){
    return(
        <div className='preview'>
            {
                pics.map( pic => {
                    return <div key={pic} className="preview__element">
                                <Image 
                                    src={pic}
                                    alt={name}
                                    width={42}
                                    height={42}
                                />
                           </div>
                })
            }
            <style jsx>{ style }</style>
        </div>
    )
}