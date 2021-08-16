import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
    .breadcrum{
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin: 0 0 .5rem 0;
    }

    .breadcrum li{
        padding-left:1rem;
        font-weight: 400;
    }

    .breadcrum li:first-child{
        padding-left:0rem;
        display: flex;
    }

    .breadcrum li:first-child > a{
        color: ${fontColor.primary}
    }

    .breadcrum li::after{
        content: '/'; 
        padding-left: .5rem;
    }

    .breadcrum li:last-child::after{
        content: '';
    }
`