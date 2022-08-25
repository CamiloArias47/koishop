import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

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
    padding: 5px;
}

.right-block,
.left-block{
    width:45%;
    display: flex;
    align-items: center;
}

.navbar-categories{
    display:none;
}

nav .logo-container > a{
    width: 42px;
    height: 42px;
    display: block;
}

nav .logo-container :global(.logo){
    padding:3px !important;
}

.right-block{
    display:flex;
    flex-direction:row;
    justify-content: flex-end;
    align-items:center;
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

.right-block :global(img:hover){
    cursor:pointer;
}


.shoppingbag-btn{
    position: relative;
}

.counter-shoppingbag{ 
    position: absolute;
    top: 35%;
    right: 40%;
    font-weight: 600;
    font-size: 1rem;
    color: ${colors.red};
}

@media (min-width: 768px){
    :global(.hamburger-react){
        display: none;
    }
    .navbar-categories{
        display: block;
        padding-left: 3rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: ${ fontColor.important };
    }
    nav .logo-container > a{
        width: 62px;
        height: 62px;
        display: block;
    }
}

@media (min-width: 1020px){
    nav{
        padding: 5px;
    }
}
`