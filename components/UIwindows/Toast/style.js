import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'
import { glass, shadow } from 'styles/theme'

export default css`
.toast-container{
    display:flex;
    justify-content: center;
    bottom: 2rem;
    position: fixed;
    z-index: 10;
    text-align: center;
}

.close-icon{
    position: absolute;
    right: 1rem;
    top: -.5rem;
    padding: 0;
    border: 0px;
    background: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    z-index: 11; 
}

.toast{
    border-radius: 5px;
    padding: .5rem;
    width: 95%;
    margin: auto;
    ${glass.toWrite}
    background: #ffffff3d;
    border: 1px solid ${fontColor.primary};
    ${shadow.card}
    color: ${fontColor.important};
    font-weight: 600;
    transform: translateY(8rem);
    transition: transform 600ms ease-out;
}
`