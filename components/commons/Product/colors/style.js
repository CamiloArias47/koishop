import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.product-colors{
    display: flex;
    align-items:center;
    margin: 1rem 1rem 0 0;
    padding:4px;
    cursor: pointer;
    border: 2px solid transparent;
    background-color: transparent;
}
.product-colors--active{
    border:2px solid ${ colors.primary };
    border-radius:14px;
}
.product-colors__ship{
    width:23px;
    height:23px;
    border-radius:50%;
    margin-left:.5rem;
}
@media (min-width: 760px){
    .product-colors{
        margin: 1rem 2rem 0 0;
    }
}
`