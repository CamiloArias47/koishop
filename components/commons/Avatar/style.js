import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
.avatar{
    text-align:center;
    overflow: hidden;
}

.avatar :global(img){
    border-radius:50%;
} 

.avatar :global(span){
    color: ${fontColor.important};
    font-weight: 500;
}
`