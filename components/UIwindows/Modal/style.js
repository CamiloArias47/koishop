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
    width:80%;
    top:20%;
    background:#fff;
    border-radius:15px;
    padding:1rem;
    padding-top:2.5rem;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.modal-container .modal .close-icon{
    position:absolute;
    right: .2rem;
    top: .2rem;
    padding: 0;
    border: 0px;
    background:#fff;
    border-radius:50%;
    width:32px;
    height:32px;
}

.modal-container .modal .close-icon:hover{
    cursor:pointer;
    background:${colors.primary};
    color:#fff;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
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
`