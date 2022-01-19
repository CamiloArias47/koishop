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
    padding:4rem .5rem 0 .5rem;
    background-color: #ffffff;
    color:${fontColor.general};
}

.products-container > h3{
    color:${fontColor.important}
}

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