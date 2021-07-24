import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`
.login-container,
.register-container{
    width:100%;
    text-align:center;
}

.register-container form{
    margin-bottom: 2rem;
}

.login-container .register-section
.register-container .goto-login-section{
    display:flex;
    flex-direction:column;
    align-items: center;
    margin-top: 2rem;
}

.login-container .btn-info,
.goto-login-section .btn-info{
    width: 70%;
}


.login-container .reset-pass-link:hover{
    cursor:pointer;
    text-decoration: underline;
}

`