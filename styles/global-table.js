import css from 'styled-jsx/css'
import { fontColor } from './theme'

export default css`
.wraper-table{
    width:100%;
    overflow-x:auto;
    margin-top: 2.5rem;
}

.wraper-table .product-column{
    width:250px;
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
@media (min-width: 1020px){
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
}
`