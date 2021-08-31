import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
nav{
    display:flex;
    justify-content:space-between;
    position:fixed;
    top:0;
    left:0;
    right:0;
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-bottom: 1px solid rgba( 255, 255, 255, 0.18 );
    z-index:10;
    color: #353535;
}

nav .logo-container{
    margin-left:37px;
} 

nav .logo-container :global(.logo){
    padding:3px !important;
}

.right-block{
    display:flex;
    flex-direction:row;
    align-items: center;
}

.right-block :global(svg:hover){
    cursor:pointer;
    color:${colors.primary}
}

.right-block :global(img){
    border-radius:50%;
    width:42px !important;
    height:42px !important;
    min-height: 42px !important;
}

.counter-shoppingbag{ 
    position: absolute;
    top: 0px;
    right: -1px;
    width: 42px;
    height: 42px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-weight: 600;
    font-size: 1.3rem;
}

`