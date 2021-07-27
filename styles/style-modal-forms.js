import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`
.login-container,
.register-container{
    width:100%;
    text-align:center;
}

.login-container h1,
.register-container h1,
.login-container h3,
.register-container h3{
    margin:0;
    color: ${fontColor.important};
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




.login-container .reset-pass-link:hover{
    cursor:pointer;
    text-decoration: underline;
}

.login-with{
    display:flex;
    flex-wrap:wrap;
    padding:2rem 0;
}

.login-with h3{
    margin:0 0 .5rem 0;
    width:100%;
}

.login-with .btn{
    width:50%;
}

`