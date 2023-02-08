import css from 'styled-jsx/css'
import { fontColor } from './theme'

export default css`
.container{
    width:100%;
    padding:1rem;
    color: ${ fontColor.general };
}

h1, h2, h3{
    color: ${ fontColor.important };
}

a{
    color: ${ fontColor.primary };
}

@media (min-width : 768px){
    .container{
        width:80%;
        margin:auto;
    }
}
`