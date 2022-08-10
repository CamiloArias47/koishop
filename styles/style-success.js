import css from 'styled-jsx/css'
import { fontColor} from 'styles/theme'

export default css`
.state-section{
    color:${fontColor.general};
    text-align:center;
    display:flex;
    flex-flow: column;
    align-items: center;
}
.state-section h1{
    color:${fontColor.general};
    font-size:3rem;
    font-weight:400;
    margin-bottom:2rem;
}
.state-section a{
    font-size:1.5rem;
}
.state-section a:hover{
    text-decoration:underline;
    color: ${fontColor.primary};
}
a.btn.btn-primary{
    width:100%;
}
a.btn.btn-primary:hover{
    text-decoration:none;
    color: ${fontColor.white};
}
`