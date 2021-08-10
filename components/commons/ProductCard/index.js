import Image from 'next/image'
import Link from 'next/link'

import style from './style'

const Cardcategory = ({name, img, price})=>{
    return (
        <>
            <div className="card product-card">
                <div className="product-card-img-container">
                    <Image
                        className="product-card-img card-img" 
                        src={img}
                        width="300"
                        height="300"
                    />
                    <span className="product-price">{price}</span>
                </div>
                <div className="product-card-details">
                    <Link href={`/producto/${name.replace(/\s/g,'-')}`}>
                     <a className="product-name"><span>{name}</span></a>
                    </Link>
                </div>
            </div>

            <style jsx>{style}</style>
        </>
    )
}

export default Cardcategory