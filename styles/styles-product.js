import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`
.product-page-section{
    padding: 0 1rem;
    color: ${fontColor.general};
    display:flex;
    flex-direction:column;
}

.product-page-section .product-image{
    text-align:center;
}


h1{
    font-size: 2rem;
    color:${fontColor.primary};
    margin: .5rem 0;
}

.product-price{
    font-size: 1.5rem;
    color:${fontColor.important};
    font-weight: 600;
}

.product-description{
    margin: 2.5rem 0;
    font-size: 1.1rem;
}

.form-add{
    display: flex;
    padding-bottom: 3rem;
}

.form-group{
    width: 30%;
    padding-right: .5rem;
}

.form-group label{
    font-weight: 500;
    color: ${fontColor.primary};
}

.input-basic{
    height: 3rem;
    margin:0;
    font-size: 2rem;
    text-align: center;
    color: ${fontColor.primary};
}
.btn-primary{
   font-size:1.4rem;
}

@media (min-width: 760px){
    .form-group{
        width: 10%;
    }
}

@media (min-width: 1020px){
    .product-page-section{
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:flex-end;
        width:80%;
        margin:auto;
    }

    .product-page-section .product-image{
        width: 60%;
    }

    .product-details{
        width:40%;
    }
    .form-add{
        margin: unset;
    }

    .form-group{
        width: 20%;
    }
}
`