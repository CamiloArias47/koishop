import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`

footer{
    position: relative;
    padding-top: 1rem;
    width: 100%;
}

.degradado{
    width:100%;
    /* height:150px; */
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(207,150,150,0.7987570028011204) 61%, rgba(207,150,150,1) 100%);
}

.wraper-degradado{
    padding:3rem 1rem 0.5rem;
    display:flex;
    flex-direction:column;
}

.wraper-degradado div{
    text-align: center;
}

.sociales span{
    display:block;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${ colors.white };
    padding-bottom: 0.5rem;
}

.sociales ul{
    display:flex;
    list-style:none;
    padding: 0;
    margin: 0;
    justify-content: space-evenly;
}

.heart{
    color: white;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 2rem 0;
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
    .wraper-degradado{
        flex-direction:row;
    }
    .wraper-degradado div{
        width:50%;
    }
    .sociales ul{
        justify-content: center;
    }
    .sociales ul li{
        padding: 0 1rem;
    }
    .sociales span{
        font-size: 1.1rem;
    }

}
`