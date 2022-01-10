import css from 'styled-jsx/css'
import { colors, fontColor } from './theme'

export default css.global`

.total-container{
    margin-top: 2rem;
    padding-top:1rem;
    border-top: 2px solid ${colors.primary}
}

.detail-field{
    display:flex;
}

.detail-field div{
    width: 50%;
    padding: .5rem 0;
    font-weight: 600;
    color: ${fontColor.important};
}

.detail-field div:nth-child(2){
    text-align: right;
}

.detail-field.total{
    border-top: 1px solid ${colors.gray};
    font-size: 1.5rem;
}

.detail-field:nth-child(3){
}

@media (min-width: 1020px){
    .sumary-cont{
        display:flex;
    }
    .anouncements{
        width:40%;
    }
    .total-container{
        width:60%;
    }
}
`