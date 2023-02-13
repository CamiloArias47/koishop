import css from 'styled-jsx/css'
import { fontColor, glass, shadow } from 'styles/theme'

export default css`
.toast-frame{
    position: fixed;
    display: flex;
    width: 100%;
    height: min-content;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 1;
    padding: 1rem;
    padding-left: 2rem;
    bottom:0;
}

.toast-container{
    display:flex;
    justify-content: center;
    bottom: 2rem;
    width: 100%;
    z-index: 10;
    text-align: center;
    margin-bottom: .2rem;
    transform: translateY(8rem);
    transition: transform 600ms ease-out;
}

.close-icon{
    position: relative;
    right: 1.6rem;
    top: .3rem;
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
}

@media (min-width: 768px){
    .toast-frame{
        width:35%;
    }
}
`
