import css from 'styled-jsx/css'
import { fontColor, glass } from 'styles/theme'

export default css`

.product-card-img-container{
    position:relative;
    display: flex;
    justify-content: center;
}

.product-card-img-container > .product-price{
    position:absolute;
    padding:.2rem;
    color:${fontColor.primary};
    font-weight: 900; 
    bottom:5%;
    left:.3rem;
    ${glass.toWrite}
}

.product-card-details{
    padding:.5rem ;
    padding-bottom: 1rem;
}

.product-card-details > .product-name{
    display:block;
    font-size:1.2rem;
}

`