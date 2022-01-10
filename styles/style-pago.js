import css from 'styled-jsx/css'
import { fontColor } from './theme'

export default css`
.wraper{
    margin: 0 auto;
    color: ${fontColor.general}
}

.btn-buy{
    margin-bottom:1rem;
}

@media (min-width: 1020px){
    .wraper{
        width:70%;
        padding:0;
    }
    .container-btn-buy{
        width: 60%;
        right: -40%;
        position: relative;
        margin-bottom: 1rem;
    }
}
`