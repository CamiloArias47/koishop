import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`
.product-page-section{
    color: ${fontColor.general};
    display:flex;
    flex-direction:column;
    padding-bottom: 3rem;
}
.product-image{
    display:flex;
    flex-direction:column;
    align-items: center;
}

.product-image .product-image_main{
    position:block;
    width:100%;
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

.form-add button svg{
    padding-left:.5rem;
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

.no-stock-info{
    font-size: 1.5rem;
    font-weight: 500;
}


@media (min-width: 760px){
    .form-group{
        width: 10%;
    }
    .product-page-section{
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:flex-end;
        width:90%;
        margin:auto;
    }

    .product-page-section .product-image{
        width: 60%;
        padding: 0 1rem;
    }
    .product-image .product-image_main{
        position:block;
        width:100%;
    }

    .product-image{
        align-items: flex-start;
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

@media (min-width: 1020px){
    .product-page-section{
        width:80%;
    }
    .product-image{
        flex-direction:row;
    }
    .product-image .product-image_main{
        order:2;
    }
}

@media (min-width: 1200px){
    .product-page-section .product-image{
        padding: 0;
    }
    .product-image .product-image_main{
        width:75%;
    }
}
`