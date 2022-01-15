import css from 'styled-jsx/css'
import {fontColor, glass} from 'styles/theme' 

export default css`
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-page{
    display: flex;
    flex-direction: column;
}

.info-page{
    width:100%;
    display:flex;
    flex-flow:row wrap;
    color: white;
}

.info-page .info-page-card{
    position:relative;
    width:50%;
}

.info-page .info-page-card .info-page-content{
    position:absolute;
    top:20%;
    left:10%;
    width:80%;
    ${glass.toWrite}
    padding:.5rem;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.info-page .info-page-card .info-page-content h3,
.info-page .info-page-card .info-page-content p{
    margin:0
}

.image-promo{
    margin-bottom:-.5rem;
    margin-top: -5px;
}

.products-container{
    padding:4rem .5rem;
    background-color: #ffffff;
    color:${fontColor.general};
}

.products-container > h3{
    color:${fontColor.important}
}

.custom-shape-divider-top-1626050420 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
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

.disponible{
    width:100%;
    height:400px;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(207,150,150,0.7987570028011204) 61%, rgba(207,150,150,1) 100%);
}

footer{
    position: relative;
    padding-top: 7rem;
    width: 100%;
}

/** For mobile devices **/
@media (max-width: 767px) {
    .custom-shape-divider-top-1626050420 svg {
        width: calc(138% + 1.3px);
        height: 67px;
    }
}

/** */
@media (min-width: 768px){
    .info-page .info-page-card .info-page-content{
        top:30%;
    }
}

@media (min-width: 1020px){

    .info-page{
        margin-top:-5px;
    }

    .products-container{
        padding: 4rem 0;
    }

    .products-section{
        width:80%;
        margin:auto;
    }

    .image-promo {
        margin-top: 0px;
        width: 33.33%;
    }

    .info-page .info-page-card{
        position:relative;
        width:33.33%;
    }
}
`