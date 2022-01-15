import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`

.ul-user-sidebar{
    text-align:right;
}

.category-sidebar :global(li),
.ul-user-sidebar li{
    padding:.5rem;
    font-size:1.5rem;
    font-weight:400;
    border-left: 2px solid transparent;
    border-bottom: 1px solid ${ colors.dimGray };
}

.category-sidebar :global(li:hover),
.ul-user-sidebar li:hover{
    border-left: 2px solid ${colors.primary};
    color: ${colors.primary};
}

@media (min-width: 760px){
    .hidde-in-desktop{
        display:none
    }
}
`