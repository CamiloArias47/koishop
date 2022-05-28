import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
    .addresscard{
        display:flex;
        flex-direction:column;
        border: 2px solid ${ colors.primary };
        border-radius: 15px;
        padding: .5rem;
        background: ${ colors.primaryUltraDim};
    }
    .addresscard_header{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        margin-bottom: .5rem;
    }
    .addresscard_direction{
        font-size: 1.2rem;
        font-weight: 500;
        margin-left:1rem;
    }
    @media (min-width:1200px){
        .addresscard{
            width:max-content;
        }
    }
`