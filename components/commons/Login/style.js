import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
.modal{
    text-align:center;
    color:${fontColor.general};
}

.modal h1{
    margin:0;
    color:${fontColor.important};
}

.modal p{
    font-size:1.3rem;
}
`