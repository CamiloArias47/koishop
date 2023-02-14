import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
.new-buy-wraper{
    text-align:center;
    color : ${fontColor.general};
}
.new-buy-wraper h1{
    color:${fontColor.important};
}
.new-buy-wraper p{
    font-size:1.3rem;
}
.actions{
    display: flex;
    justify-content:space-evenly;
}
.btn{
    width:35%;
}
.btn-primary{
    margin-top:0;
}
`
