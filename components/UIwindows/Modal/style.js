import css from 'styled-jsx/css'
import { glass, colors } from 'styles/theme'

export default css`
.modal-container{
    position:fixed;
    display: flex;
    justify-content: center;
    top:0;
    bottom:0;
    right:0;
    left:0;
    ${glass.toWrite}
    z-index:12;
}

.modal{
    position:absolute;
    width:90%;
    top:10%;
    background:#fff;
    border-radius:15px;
    padding:1rem;
    padding-top:2.5rem;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.modal-container .modal .close-icon{
    right: .2rem;
    top: .2rem;
    width:32px;
    height:32px;
}


@media (min-width: 760px){
    .modal{
        width:50%;
    }
}

@media (min-width: 1020px){
    .modal{
        width:40%;
    }
}

@media (min-width: 1200px){
    .modal{
        width:30%;
    }
}
`