import style from "./style"

export default function ColorOptions({color, selectColor, activeColor}){
    const bgColor = {
        backgroundColor : color?.color
    }
    
    const handlerClick = event => {
        event.preventDefault()
        selectColor(color.name)
    }

    return(
        <button 
            className={activeColor === color.name ? 'product-colors product-colors--active' : 'product-colors'} 
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