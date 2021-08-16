import { useState, useEffect } from 'react'
import { useCommerce } from 'components/CommerceContext'

import style from './style'
import Image from 'next/image'
import RowIcon from 'components/icons/Row-Icon'

const BTN = {
    left:'l',
    right:'r'
}

const SLIDER_SIZE = 82 //size in px of each slider

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
                        alt={name} 
                        unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
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
    const {categories} = useCommerce()

    const handlerClick = event =>{
        const btn = event.target.dataset.move
        let mov = btn === BTN.left ? move+246 : move-246
        setMove(mov)
    }
    const sliders = categories.map( cat =>
        <CategorySlide img={cat.photo} name={cat.name} key={cat.id} moveX={move}/>
    )

    const totalCategories = categories.length

    return(
            <div className="slider">
                <button data-move={BTN.left} onClick={handlerClick} className={move >= 0 ? 'hide' : ''}>
                    <RowIcon width="32" height="32" data-move={BTN.left}/>
                </button>
                <div className="container-category-slider">
                    {sliders}
                </div>
                <button data-move={BTN.right} onClick={handlerClick} className={totalCategories*SLIDER_SIZE-(move*-1) <= 578 ? 'hide': ''}>
                    <RowIcon width="32" height="32" className="to-right" data-move={BTN.right}/>
                </button>

                <style jsx>{style}</style>
            </div>
    )
}