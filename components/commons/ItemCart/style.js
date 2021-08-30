import {css} from 'styled-jsx/css'
import { fontColor, colors } from 'styles/theme'

export default css`
li{
    display:flex;
    flex-flow: row nowrap;
    color:${fontColor.general};
    align-items: center;
}

.item-car-image{
    width:30%;
}

.item-car-description{
    width:60%;
    display: flex;
    flex-direction: column;
    padding-left:.2rem;
}

h3{
    margin:0;
}

.quit-product-container{
    width:10%;
}

.close-icon{
    position:relative;
    right:0;
    top:0;
    width: 25px;
    height: 25px;
    background: ${colors.primaryDim};
    color: #fff;
}
`