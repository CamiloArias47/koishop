import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.preview{
    display:flex;
    padding:.5rem;
    width:100%;
}
.preview__element{
    display: flex;
    align-content: center;
    border-radius: 50%;
    border: 2px solid ${ colors.primary };
    background-color: ${ colors.primary };
}
.preview__element :global(img){
    border-radius: 50%;
}
@media (min-width: 1020px){
    .preview{
        width:60%;
    } 
}
`