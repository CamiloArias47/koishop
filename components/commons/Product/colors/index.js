import style from "./style"

export default function ColorOptions({color, selectColor, activeColor}){
    const bgColor = {
        backgroundColor : color?.color
    }
    
    const handlerClick = event => {
        event.preventDefault()
        selectColor(color.name)
    }

    const classStyle = color.amount === 0 ? 'product-colors product-colors--nostock' : 'product-colors'

    return(
        <button 
            className={activeColor === color.name ? 'product-colors product-colors--active' : classStyle} 
            onClick={handlerClick}
        >
            <span>{color.name}</span>
            {
                color.color 
                    ? <span className="product-colors__ship" style={bgColor}></span>
                    : null
            }
            <style jsx>{style}</style>
        </button>
    )
}