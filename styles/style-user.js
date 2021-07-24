import css from 'styled-jsx/css'

export default css`

form{
    margin-top:2rem;
    padding-bottom:2rem;
}

form button{
    margin-top:3rem;
}

@media (min-width : 1020px){
    form .form-controller{
        display: grid;
        grid-template-columns: 1fr 3fr;
    }
}



`