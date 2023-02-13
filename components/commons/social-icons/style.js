import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
span{
    display:block;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${colors.white};
    padding-bottom: 0.5rem;
}

ul{
    display:flex;
    list-style:none;
    padding: 0;
    margin: 0;
    justify-content: space-evenly;
}

@media (min-width: 767px) {

     ul{
        justify-content: center;
    }
     ul li{
        padding: 0 1rem;
    }
     span{
        font-size: 1.1rem;
    }

}
`
