import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
.product-page-section{
    padding: 0 1rem;
    color: ${fontColor.general}
}

h1{
    font-size: 2rem;
    color:${fontColor.primary};
    margin: .5rem 0;
}

.product-price{
    font-size: 1.5rem;
    color:${fontColor.important}
}

.product-description{
    margin: 2.5rem 0;

}
`