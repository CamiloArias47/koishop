import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from "utils"

import { createProductPath } from 'utils'

import style from './style'

const Cardcategory = ({name, img, price})=>{
    return (
        <>
            <div className="card product-card">
                <Link href={`/producto/${ createProductPath(name) }`}>
                    <a >
                        <div className="product-card-img-container">
                            <Image
                                className="product-card-img card-img" 
                                src={img}
                                width="300"
                                height="300"
                                alt={name}
                                unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                            />
                            <span className="product-price">{formatPrice(price)}</span>
                        </div>
                        <div className="product-card-details">
                            <span className="product-name">{name}</span>
                        </div>
                    </a>
                </Link>
            </div>

            <style jsx>{style}</style>
        </>
    )
}

export default Cardcategory