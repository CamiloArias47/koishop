import css from 'styled-jsx/css'
import { glass, shadow } from 'styles/theme'

export default css`
.block-window{
    position: fixed;
    display:flex;
    opacity:0;
    inset: 0px;
    ${glass.toWrite}
    ${shadow.card}
    overflow-y: scroll;
    z-index:2147483647;
    transition: opacity .3s ease-in-out;
    align-items: center;
    justify-content: center;
}

`