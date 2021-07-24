import { useState, useEffect } from 'react'
import style from './style'
import Image from 'next/image'
import RowIcon from 'components/icons/Row-Icon'

const BTN = {
    left:'l',
    right:'r'
}

function CategorySlide({img,name, moveX}){

    const [slide, setSlide] = useState(`translateX(${moveX}px)`)

    useEffect(()=>{
        setSlide(`translateX(${moveX}px)`)
    },[moveX])

    return (
        <>
            <div className="category-slide" style={{transform:slide}}>
                <div className="category-circle">
                    <Image 
                        src={img}
                        className="category-slide-image"
                        width="64"
                        height="64"
                    />
                </div>
                <div className="category-title">{name}</div>
            </div>

            <style jsx>{style}</style>
        </>
    )
}

export default function CategorySlider(){
    const [move, setMove] = useState(0)

    const handlerClick = event =>{
        const btn = event.target.dataset.move
        let mov = btn === BTN.left ? move+246 : move-246
        setMove(mov)
    }

    return(
        <div className="slider">
            <button data-move={BTN.left} onClick={handlerClick} className={move >= 0 ? 'hide' : ''}>
                <RowIcon width="32" height="32" data-move={BTN.left}/>
            </button>
            <div className="container-category-slider">
                <CategorySlide img="/images/cat7.jpg" name="Ojos" moveX={move}/>
                <CategorySlide img="/images/cat6.jpg" name="Labios" moveX={move}/>
                <CategorySlide img="/images/cat5.jpg" name="Base" moveX={move}/>
                <CategorySlide img="/images/cat4.jpg" name="Brochas" moveX={move}/>
                <CategorySlide img="/images/cat3.jpg" name="Rostro" moveX={move}/>
                <CategorySlide img="/images/cat2.jpg" name="Cuidado Personal" moveX={move} />
                <CategorySlide img="/images/cat1.jpg" name="Cabello" moveX={move}/>
                <CategorySlide img="/images/cat7.jpg" name="Uñas" moveX={move}/>
                <CategorySlide img="/images/cat6.jpg" name="Accesorios" moveX={move}/>

                <CategorySlide img="/images/cat7.jpg" name="Ojos" moveX={move}/>
                <CategorySlide img="/images/cat6.jpg" name="Labios" moveX={move}/>
                <CategorySlide img="/images/cat5.jpg" name="Base" moveX={move}/>
                <CategorySlide img="/images/cat4.jpg" name="Brochas" moveX={move}/>
                <CategorySlide img="/images/cat3.jpg" name="Rostro" moveX={move}/>
                <CategorySlide img="/images/cat2.jpg" name="Cuidado Personal" moveX={move} />
                <CategorySlide img="/images/cat1.jpg" name="Cabello" moveX={move}/>
                <CategorySlide img="/images/cat7.jpg" name="Uñas" moveX={move}/>
                <CategorySlide img="/images/cat6.jpg" name="Ultima" moveX={move}/>
            </div>
            <button data-move={BTN.right} onClick={handlerClick} className={18*82-(move*-1) <= 578 ? 'hide': ''}>
                <RowIcon width="32" height="32" className="to-right" data-move={BTN.right}/>
            </button>

            <style jsx>{style}</style>
        </div>

    )
}