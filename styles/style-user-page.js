import css from 'styled-jsx/css'
import { colors } from './theme'

export default css`
    h1{
        padding-bottom: 2rem !important;   
    }
    h3{
        border-bottom: 2px solid ${ colors.dimGray };
    }
    .addresslist{
        display:grid;
        grid-template-columns: 1fr;
        gap: .5rem;
    }
    @media (min-width: 768px){
        .addresslist{
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (min-width: 1200px){
        .addresslist{
            grid-template-columns: repeat(3, 1fr);
        }
    }
`