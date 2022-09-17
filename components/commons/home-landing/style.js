import css from 'styled-jsx/css'
import { glass } from 'styles/theme' 

export default css`
.info-page{
    width:100%;
    display:flex;
    flex-flow:row wrap;
    color: white;
}

.info-card__content{
    padding: 2rem 0rem;
    width: 40%;
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.info-page .info-page-card{
    position:relative;
    width:50%;
}

.info-page .info-page-card--main{
    width:100%;
    background-color: #8ACFC4;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 1rem 0;
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


.info-page__product-main{
    background-color: #edece1;
    color: #ee8582;
    width: 100%;
    padding: 3rem;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
}
.info-page__title{
    display:flex;
    flex-direction:column;
    order:1;
}

.info-page__title h1{
    font-size: 2rem;
    margin: 0;
    line-height: 2rem;
}

.info-page__title .btn-promo{
    border-radius: 0;
    border: 4px solid #ee8582;
    background-color: transparent;
    color: #ee8582;
    font-size: 1rem;
    margin-top: 0.5rem;
    font-weight:600;
}

.info-page__title .btn-promo:hover{
    border-radius: 0;
    border: 4px solid white;
    background-color: transparent;
    color: white;
}

.info-page__image{
    width:40%;
    order:0;
}

.info-card__main-text{
    position: absolute;
    left: 6%;
}

.info-card__content h1{
    margin:0;
}

.info-card__content .main-text__first{
    font-size:5rem;
}

.info-card__content .main-text__first > span{
    display:block;
    font-size: 1.7rem;
    margin-top: -12px;
}

.info-card__content .main-text__second{
    font-size: 2rem;
}

.info-card__content .main-text__second > span{
    display:block;
    font-size: 1rem;
}

.image-promo{
    width: 50%;
    padding: 1rem 0;
    transform: rotate(8deg);
}

@media (min-width: 500px){
    .info-card__main-text{
        left: 14%;
    }
    .info-card__content .main-text__first{
        font-size:6rem;
    }
    .info-card__content .main-text__first > span{
        margin-top: -24px;
    }
    .info-card__content .main-text__second{
        font-size: 3rem;
    }
    .info-card__content .main-text__second > span{
        display:block;
        font-size: 1.7rem;
        margin-top: -12px;
    }
}

@media (min-width: 768px){
    .info-page .info-page-card .info-page-content{
        top:30%;
    }
    .info-page__product-main{
        flex-direction:row;
    }
    .info-page__title{
        order:0;
    }
    .info-page__title h1{
        font-size:4rem;
        line-height: 3rem;
    }
    .info-page__title .btn-promo{
        font-size: 2rem;
    }
    .info-page__image{
        width: 15%;
        order:1;
    }
}


@media (min-width: 1020px){
    .info-page{
        margin-top:-5px;
    }

    .info-page .info-page-card{
        position:relative;
        width:33.33%;
    }

    .info-page__product-main{
        padding: 6rem 3rem;
    }
    .info-card__content .main-text__first{
        font-size:5rem;
    }
    .info-card__content .main-text__second{
        font-size: 2rem;
    }
}
`