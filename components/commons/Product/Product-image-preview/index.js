import Image from 'next/image'
import style from './style'

export default function ImagePreview({pics, name, changeImage}){
    return(
        <div className='preview'>
            {
                pics.map( pic => {
                    return <button key={pic} className="preview__element" onClick={() => { changeImage(pic) }}>
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