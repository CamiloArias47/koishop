import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.product-column{
    display:flex;
    width:250px;
    align-items: center;
}

.product-column .image-product{
    width:35%;
}

.amount-td{
    text-align:center;
}

tr td{
    min-height: 75px;
    border-top: 1px solid #d2d2d2;
}

.amount-td{
    padding: 0 .5rem;
}

.amount-td .controls-amount{
    display: flex;
    justify-content: space-between;
    max-width: 70px;
}

.amount-td .controls-amount button{
    background: ${colors.primaryDim};
    border: 1px solid ${colors.primaryDim};
    border-radius:5px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
}

.amount-td .controls-amount button:hover{
    cursor: pointer;
    background: ${colors.primary} !important;
    box-shadow: -1px 3px 7px -1px rgb(0 0 0 / 62%);
}

.close-td{
    padding:1rem;
}

.close-icon{
    position: relative;
    padding-top: .1rem;
    right: 0;
    top: 0;
    width: 25px;
    height: 25px;
    background: #d2aeae;
    color: #fff;
    z-index:0;
}

@media (min-width: 1020px){
    .product-column{
        width:auto;
    }
    .product-column .image-product{
        width:20%;
    }
}
`
