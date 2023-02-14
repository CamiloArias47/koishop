import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`

.user-layout{
    padding: 0 1rem .3rem 1rem;
    color:${fontColor.general};
    background:${colors.white};
}

.user-layout .menu-left{
    display:none;
}

.user-layout :global(h1){
    color:${fontColor.important};
    margin:0;
    padding:0;
}

@media (min-width : 760px){
    :global(body){
        background:${colors.dimGray};
    }

    :global(.main-section){
        background:${colors.dimGray};
        padding-bottom:2rem;
    }

    .user-layout{
        padding:0;
        display:flex;
        border: 1px solid ${colors.gray};
        margin: 0 .5rem .5rem .5rem;
    }

    .user-layout .menu-left{
        display: block;
        width:25%;
        border-right: 1px solid ${colors.gray};
    }

    .user-layout .menu-left ul{
        list-style: none;
        margin:0;
        padding:0;
    }

    .user-layout .menu-left .user-menu-container .user-profile-info{
        padding:1rem;
    }

    .user-layout .menu-left ul li{
        padding:1rem;
        border-left: 2px solid transparent;
    }

    .user-layout .menu-left ul li:hover{
        background:${colors.dimGray};
        border-left: 2px solid ${colors.gray};
        cursor: pointer;
    }

    .user-layout .menu-left ul li.active{
        background:${colors.dimGray};
        border-left: 2px solid ${colors.primary};
    }

    .container-main{
        width: 75%;
        padding: 1rem;
    }
}

@media (min-width : 1020px){
    .user-layout{
        width:70%;
        margin:auto;
    }

    .container-main{
        padding: 1rem 5rem;
    }
}
`
