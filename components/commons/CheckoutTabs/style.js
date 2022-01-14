import css from 'styled-jsx/css'

export default css`
form{
    display:flex;
    flex-direction:column;
}

.envio-container,
.facturacion-container{
    padding:.5rem;
}

@media (min-width: 768px){
    form{
        flex-direction:row;
        flex-wrap: wrap;
    }
    .envio-container,
    .facturacion-container{
        width:50%
    }
    .container-btn-buy{
        width:100%;
    }

}
`