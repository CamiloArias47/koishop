import css from 'styled-jsx/css'
import { colors, fontColor, scrollRules } from 'styles/theme'

export default css`
.cart-container{
    display:flex;
    flex-direction:column;
}


.cart-container .cart-list{
    height: 27rem;
    overflow: scroll;
    overflow-x: hidden;
    border-bottom: 3px solid ${colors.primary}
}

.pay-resume{
    color:${fontColor.general};
    font-weight: 600;
}

.pay-resume div{
    display:flex;
    justify-content: space-between;
}

.pay-resume .pay-resume-total{
    color:${fontColor.important};
    font-size: 1.3rem;
    font-weight: 600;
    padding-top: .3rem;
}



@media (min-width: 1020px){
    .cart-list::-webkit-scrollbar {
        width: .4em;
    }
    
    .cart-list::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }
    
    .cart-list::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 20px;
    }
}
`