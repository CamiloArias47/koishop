import css from 'styled-jsx/css'
import { fontColor, colors } from 'styles/theme'

export default css`
.animation{
    display:flex;
    position:relative;
    justify-content:center;
    text-align:center;
    width: 100%;
    height: 50vh;
}
.animation__circle{
    width: 250px;
    height: 250px;
    background-color: ${colors.gray};
    border-radius: 75%;
    bottom: 15%;
    position: absolute;
    animation: bomb 3s linear infinite;
}
.animation__circle::before{
    content:'!';
    position: relative;
    top: -11%;
    color: ${fontColor.white};
    font-size: 15rem;
    font-weight: 600;
    font-family: monospace;
    text-align: center;
}
.animation__card{
    width:27%;
    position:absolute;
    bottom:20%;
    animation-name: bounce;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    z-index:2;
}
.animation__card--left{
    left:10%;
    transform: rotate(327deg);
}
.animation__card--right{
    right:10%;
    bottom:50%;
    animation-name:bounce--right;
    transform: rotate(35deg);
}

@media (min-width:768px){
    .animation__circle{
        bottom: 40%;
        width: 200px;
        height: 200px;
    }
    .animation__circle::before{
        font-size: 13rem;
    }
    .animation__card{
        width:20%;
    }
    .animation__card--left{
        left:25%;
    }
    .animation__card--right{
        right:25%;
    }
}

@media (min-width:1200px){
    a.btn.btn-primary{
        width:70%;
    }
}

@keyframes bounce{
    0%{
        bottom:20%;
        transform: rotate(327deg);
    }
    45%{
        bottom:50%;
    }
    50%{
        bottom:50%;
        transform: rotate(351deg);
    }
   
    100%{
        bottom:20%;
        transform: rotate(327deg);
    }
}

@keyframes bounce--right{
    0%{
        bottom:50%;
        transform: rotate(35deg);
    }
    45%{
        bottom:20%;
    }
    50%{
        bottom:20%;
        transform: rotate(12deg);
    }
   
    100%{
        bottom:50%;
        transform: rotate(35deg);
    }
}

@keyframes bomb{
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1);
    }
    80%{
        transform: scale(1.3);
    }
    85%{
        transform: scale(1.1);
    }
    90%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1);
    }
}

.image-container{
    position:relative;
    margin:auto;
    width:40%;
}
`
