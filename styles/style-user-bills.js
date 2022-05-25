import css from 'styled-jsx/css'
import { fontColor, colors } from 'styles/theme'

export default css`
    tr > td {
        padding-left: .5rem;
    }
    tbody tr:nth-child(odd){
        background-color: ${ colors.dimGray };
    }
    td{
        padding: .8rem 0;
    }
    a:hover{
        color: ${ fontColor.primary };
    }
`