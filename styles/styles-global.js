import css from 'styled-jsx/css'
import { colors, fontColor, shadow } from './theme'

export const globalStyles = css.global`
.wraper{
    padding: 0 1rem;
}

.card{
    border-radius: 5px;
    background-color: #ffffff;
    ${shadow.card}
}

.card .card-img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.hide{
    visibility:hidden !important;
}

.show{
    visibility:visible !important;
}
.show-block{
    display : block !important;
}

.alert-message{
    border: 1px solid ${colors.alertDark};
    border-radius: 10px;
    background: ${colors.alert};
    padding: .8rem;
    width: 100%;
    margin-top: .5rem;
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

.form-controller.wrong .input-primary,
.form-controller.wrong .input-basic{
    border: 1px solid ${colors.red} !important;
}

.form-controller.wrong label{
    color: ${colors.red} !important;
    font-weight: 600;
}     

.form-controller.wrong label::after{
    content: ": campo requerido❗";
    font-size: .8rem;
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

.close-icon:hover{
    cursor:pointer;
    background:${colors.primary} !important;
    color:#fff;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.wrapper-loading{
    width: 100%;
    overflow:hidden;
}
`