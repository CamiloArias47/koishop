import Image from 'next/image'

import style from './style'

const Cardcategory = ({name, img, price})=>{
    return (
        <>
            <div className="card product-card">
                <div className="product-card-img-container">
                    <Image
                        className="product-card-img card-img" 
                        src={img}
                    />
                    <span className="product-price">{price}</span>
                </div>
                <div className="product-card-details">
                    <span className="product-name">{name}</span> 
                </div>
            </div>

            <style jsx>{style}</style>
        </>
    )
}

export default Cardcategory