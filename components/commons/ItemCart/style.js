import {css} from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

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
    width:70%;
    display: flex;
    flex-direction: column;
    padding-left:.2rem;
}

h3{
    margin:0;
}
`