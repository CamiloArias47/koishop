import css from 'styled-jsx/css'
import { colors, fontColor } from 'styles/theme'

export default css`

footer{
    position: relative;
    padding-top: 1rem;
    width: 100%;
}

.degradado{
    width:100%;
    color: ${ fontColor.important };
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(207,150,150,0.7987570028011204) 61%, rgba(207,150,150,1) 100%);
}

.wraper-degradado{
    padding:3rem 1rem 0.5rem;
}

.footer{
    background-color: #ead1d1;
}

.wraper-info-footer{
    display:flex;
    flex-flow: row wrap;
    padding-top: 5rem;
    margin :  auto;
    width : 95%;
}

.wraper-info-footer div{
    width:100%;
    text-align: left;
}

.wraper-info-footer span{
    display:flex;
    font-size: 1rem;
    font-weight: 500;
    color: ${ fontColor.important };
    padding-bottom: 0.5rem;
    align-items: center;
    justify-content: space-between;
}

.wraper-info-footer button{
    display: inline-block;
    border: none;
    background: transparent;
    transform: rotate(270deg);
}

.wraper-info-footer button svg{
}

.wraper-info-footer ul{
    list-style:none;
    padding: 0;
    margin: 0;
    height:0;
    overflow: hidden;
    transition: height .6s ease;
    color : ${ fontColor.general };
    border-bottom:1px solid ${ colors.primaryUltraDim };
}

.wraper-info-footer ul.show-height{
    height:100px;
}

.wraper-info-footer > ul{
    display:flex;
    justify-content: space-evenly;
}

.heart{
    font-weight: 500;
    font-size: .8rem;
    text-align : center !important;
    padding: 2rem 0 .3rem;
    width: 100% !important;
}

.contact ul{
    text-align: left;
}

.contact ul li{
    padding: .3rem 0;
}

.whatsapp-li a{
    display: flex;
    align-items: center;
    justify-content: start;
}

.whatsapp-li a span{
    padding-left:.2rem;
    padding-bottom:0;
    color : ${ fontColor.general };
}

.sociales span{
    justify-content:center;
    padding-top: 2rem;
}

.sociales :global(ul){
    justify-content:center;
}

.sociales :global(ul li){
    padding : 0 1rem;
}


.custom-shape-divider-top-1626050420 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    background-color: #ead1d1;
}

.custom-shape-divider-top-1626050420 svg {
    position: relative;
    display: block;
    margin-top: -1px;
    width: calc(100% + 1.3px);
    height: 120px;
    transform: rotateY(180deg);
}

.custom-shape-divider-top-1626050420 .shape-fill {
    fill: #CF9696;
}


    
@media (max-width: 767px) {
    .custom-shape-divider-top-1626050420 svg {
        width: calc(138% + 1.3px);
        height: 67px;
    }
}

@media (min-width: 767px) {
    .wraper-info-footer{
        flex-direction:row;
        width: 80%;
        padding-top: 9rem;
    }
    .wraper-info-footer div{
        width: 25%;
        text-align: left;
    }
    .wraper-info-footer :global(button){
        display: none;
    }
    .heart{
        font-size: 1rem;
        text-align : right !important;
    }
    .contact ul{
        text-align: left;
    }
    .wraper-info-footer ul{
        display: block;
        height:auto;
        border-bottom:none;
    }
    .whatsapp-li a{
        justify-content: left;
    }
    .sociales span{
        padding-top:0;
    }
}
`