import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.discount-code-form{
    display:flex;
    flex-flow:row wrap;
}
.discount-code-form label{
    width:100%;
}
.discount-code-form .input{
    width:75%;
}
.discount-code-form button{
    width: 22%;
    margin: 0.3rem 0 0.3rem 0.2rem;
    padding: 0px;
    font-size: 0.8rem;
    font-weight: 400;
}
.info-code{
    display:flex;
    height: 7rem;
}
.info-code-text{
    width: 70%;
    align-self: center;
    text-align: center;
    font-size: 2rem;
    font-weight: 300;
}
.info-code-animation{
    width:30%;
}
.checkout-resume{
    padding-top:2rem;
    width:100%;
}
.checkout-resume div{
    display:flex;
    flex-flow:row wrap;
    padding-bottom: .5rem;
}
.checkout-resume div span{
    width:50%;
}
.checkout-resume div span.checkout-resume--price{
    width:50%;
    text-align:right;
}
.checkout-resume .total-to-pay{
    font-weight: 600;
    font-size: 1.2rem;
    border-top: 1px solid ${colors.gray};
}
.checkout-resume .total-to-pay .checkout-resume--price{
    width: 50%;
    text-align: right;
}

@media (min-width: 768px){
    .checkout-resume div span{
        width:35%;
    }
    .checkout-resume div span.checkout-resume--price{
        width:20%;
    }
    .checkout-resume .total-to-pay .checkout-resume--price{
        width: 20%;
    }
}
`
