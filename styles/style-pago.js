import css from 'styled-jsx/css'
import { colors } from './theme'

export default css`
.wraper-table{
    width:100%;
    overflow-x:auto;
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
`