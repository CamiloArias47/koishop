import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
    button{
        border: none;
        background-color: transparent;
        transition: transform 300ms ease 0ms;
        transform: rotate(270deg);
    }

    button.row-up{
        transform: rotate(90deg);
    }

    button:hover{
        color: ${colors.primary};
    }
`
