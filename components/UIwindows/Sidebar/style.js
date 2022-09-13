import css from 'styled-jsx/css'
import { colors, shadow} from 'styles/theme'

export default css`
.slidebar-container{
    width:100%;
    position: fixed;
    top: 59px;
    bottom: 0;
    -webkit-backdrop-filter: blur( 4px );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    z-index: 11;
}

.sidebar{
    width: 88%;
    position: absolute;
    bottom: 0;
    top: 0;
    background-color: #fff;
    padding: 1rem;
    overflow: scroll;
    overflow-x: hidden;
    ${shadow.card}
}

.sidebar :global(ul){
    margin:0;
    padding:0;
    list-style-type: none;
}

.close-btn{
    display:none;
}

@media (min-width: 768px){
    .sidebar{
        width: 50%;
    }
    .slidebar-container{
        top: 70px;
    }
    .close-btn{
        display:block;
        z-index: 1;
        position: absolute;
        background-color:transparent;
        border:none;
        cursor: pointer;
    }
    .close-btn :global(svg:hover){
        color:${ colors.primary };
    }
    .close-btn--right{
        right: 50%;
    }
    .close-btn--left{
        left: 50%;
    }
}

@media (min-width: 1020px){
    .sidebar{
        width: 40%;
    }
    .sidebar::-webkit-scrollbar {
        width: .4em;
    }
    
    .sidebar::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }
    
    .sidebar::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border-radius: 20px;
    }
    .close-btn--right{
        right: 40%;
    }
    .close-btn--left{
        left: 40%;
    }
}

@media (min-width: 1200px){
    .sidebar{
        width: 24%;
    }
    .close-btn--right{
        right: 24%;
    }
    .close-btn--left{
        left: 24%;
    }
}
`