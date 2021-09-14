import css from 'styled-jsx/css'
import { colors, fontColor } from './theme'

export default css`
.wraper{
    margin: 0 auto;
    color: ${fontColor.general}
}

.wraper-table{
    width:100%;
    overflow-x:auto;
    margin-top: 2.5rem;
}

.wraper-table::-webkit-scrollbar {
    width: .2em;
    height: .3rem;
}

.wraper-table::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}

.wraper-table::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
    border-radius: 20px;
}

table{
    max-width:768px;
    border-spacing: 0;
    margin: auto;
}

table thead{
    text-transform: uppercase;
    text-align: left;
}

table thead th{
    padding: 1rem 1rem 1rem 0;
    color:${fontColor.important}
}

.product-column{
    width:250px;
}

.total-container{
    margin-top: 2rem;
    padding-top:1rem;
    border-top: 2px solid ${colors.primary}
}

.detail-field{
    display:flex;
}

.detail-field div{
    width: 50%;
    padding: .5rem 0;
    font-weight: 600;
    color: ${fontColor.important};
}

.detail-field div:nth-child(2){
    text-align: right;
}

.detail-field.total{
    border-top: 1px solid ${colors.gray};
}

.detail-field:nth-child(3){
    font-size: 1.5rem;
}

.btn-buy{
    margin-bottom:1rem;
}

@media (min-width: 1020px){
    .wraper{
        width:70%;
        padding:0;
    }

    table{
        max-width:none;
        width: 100%;
    }
    .product-column{
        width:auto;
    }
    table thead th{
        padding: 1rem 2rem 1rem 0;
    }
    .sumary-cont{
        display:flex;
    }
    .anouncements{
        width:40%;
    }
    .total-container{
        width:60%;
    }
    .container-btn-buy{
        width: 60%;
        right: -40%;
        position: relative;
        margin-bottom: 1rem;
    }
}
`