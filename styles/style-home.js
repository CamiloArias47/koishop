import css from 'styled-jsx/css'
import {fontColor} from 'styles/theme' 

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
    width:100%;
}

.products-container{
    padding:4rem .5rem 0 .5rem;
    background-color: #ffffff;
    color:${fontColor.general};
}

.products-container > h3{
    color:${fontColor.important}
}


@media (min-width: 1020px){
    .products-container{
        padding: 4rem 0;
    }

    .products-section{
        width:80%;
        margin:auto;
    }
}
`