import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.preview{
    display:flex;
    padding:.1rem 0;
    width:100%;
}
.preview__element{
    display: block;
    align-content: center;
    width: 20%;
    padding: .1rem;
    border: 0;
}
.preview__element:hover{
    cursor:pointer;
}
.preview > .preview__element{
    padding-left:0;
}
.preview__element:last-child{
    padding-right:0;
}

.preview__element :global(img){
    aspect-ratio: 1;
}
@media (min-width: 1020px){
    .preview{
        width:19.5%;
        flex-direction:column;
    } 
    .preview__element{
        width: 100%;
    }
}
@media (min-width: 1200px){
    .preview{
        width: 14.8%;
    }
}
`