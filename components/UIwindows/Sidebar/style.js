import css from 'styled-jsx/css'
//import {glass} from 'styles/theme'

export default css`
.slidebar-container{
    width:100%;
    position: fixed;
    top: 49px;
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
}

.sidebar :global(ul){
    margin:0;
    padding:0;
    list-style-type: none;
}
`