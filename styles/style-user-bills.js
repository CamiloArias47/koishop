import css from 'styled-jsx/css'
import { fontColor, colors } from 'styles/theme'

export default css`
    .grid{
        display:grid;
        grid-template-columns: 1fr;
        gap:8px;
    }
    .billcard{
        background-color: ${ colors.veryDimGray };
        border: 1px solid ${ colors.gray };
        border-radius: 10px;
        padding: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .billcard:hover{
        cursor:pointer;
        background-color: ${ colors.primaryUltraDim };
        color: ${ fontColor.primary };
    }
    .billcard_header{
        display:flex;
        align-items: center;
        justify-content: space-between;
    }
    .billcard_code{
        font-weight: 500;
    }
    .billcard_body{
        display:flex;
        flex-direction: column;
    }
    .billcard_price{
        font-weight: 500;
        font-size: 1.2rem;
    }
    .billcard_date{
        font-size: .8rem;
    }
    .billcard_header :global(img){
        marging-right:6px;
    }
    .billcard_footer{
        display:flex;
        justify-content: flex-end;
        font-size: 12px;
        padding-top:1rem;
    }
    .billcard_badgestatus{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        margin-right: 4px;
    }
    
    .billcard_badgestatus.APPROVED{
        background-color: ${ colors.green };
    }
    .billcard_badgestatus.incomplete{
        background-color: ${ colors.alert };
    }
    .billcard_badgestatus.DECLINED{
        background-color: ${ colors.red };
    }

    @media (min-width: 768px){
        .grid{
            grid-template-columns: repeat(2, 1fr);
        }
    }
  
    @media (min-width: 1200px){
        .grid{
            grid-template-columns: repeat(3, 1fr);
        }
    }
`