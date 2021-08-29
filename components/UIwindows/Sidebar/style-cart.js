import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`
.cart-container{
    display:flex;
    flex-direction:column;
}

.cart-container ul{
    height: 27rem;
    overflow: scroll;
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
`