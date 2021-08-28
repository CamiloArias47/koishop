import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'
import { glass } from 'styles/theme'

export default css`
.toast-container{
    display:flex;
    justify-content: center;
}

.toast{
    border: 1px solid ${fontColor.primary};
    border-radius: 5px;
    background: white;
    position: fixed;
    padding: .5rem;
    bottom: 2rem;
    width: 85%;
    margin: auto;
    z-index: 10;
    text-align: center;
    ${glass.toWrite}
}
`