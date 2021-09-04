import css from 'styled-jsx/css'
import { colors } from './theme'

export default css`
.wraper-table{
    width:100%;
    overflow-x:auto;
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
}

table thead{
    text-transform: uppercase;
    text-align: left;
}

table thead th{
    padding: 0 1rem;
}

.product-column{
    width:250px;
}

@media (min-width: 1020px){
    table{
        width:100%;
        max-width:none;
    }
}
`