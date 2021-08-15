import css from 'styled-jsx/css'
import { colors, fontColor } from './theme'

export const globalStyles = css.global`
.card{
    border-radius: 5px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.27); 
    box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.27);
}

.card .card-img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.hide{
    visibility:hidden !important;
}

.alert-message{
    border: 1px solid ${colors.alertDark};
    border-radius: 10px;
    background: ${colors.alert};
    padding: .8rem;
}

.success-message{
    border: 1px solid ${colors.greenDark};
    border-radius: 10px;
    background: ${colors.green};
    padding: .8rem;
    color: ${fontColor.important};
    text-align: center;
    font-weight: 500;
}

.btn{
    font-size:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn,
.input{
    width: 100%;
    border-radius: 10px;
    padding:.8rem;
}

.btn-primary{
    margin-top: .5rem;
    background: ${colors.primary};
    color: ${colors.white};
    font-size: 1rem;
    font-weight: 600;
    border: 1px solid ${colors.primaryDark};
}

.btn-primary:hover,
.btn-info:hover{
    cursor:pointer;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.btn-primary:disabled{
    cursor:not-allowed;
}

.btn-info{
    background: ${colors.whiteBone};
    color: ${colors.primary};
    border: 1px solid;
}

.input-primary{
    border: 1px solid ${colors.gray};
    margin: .3rem 0;
    background: ${colors.dimGray};
}

.input-basic{
    border: 1px solid ${colors.primary};
    margin: .3rem 0;
    background: ${colors.white};
}

.input-primary:focus,
.input-basic:focus{
    border: 1px solid ${colors.primaryDark};
}
`