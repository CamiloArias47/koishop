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
    border-bottom: 1px solid ${colors.dimGray};
}

.category-sidebar :global(li:hover),
.category-sidebar :global(li.active),
.ul-user-sidebar li:hover{
    border-left: 2px solid ${colors.primary};
    color: ${colors.primary};
    background-color: ${colors.primaryUltraDim};
}

.category-sidebar :global(.category-item){
    display: flex;
    justify-content: space-between;
}

.category-sidebar :global(.subcategory-list){
    background-color: ${colors.primaryUltraDim};
}

.social-wraper{
    background-color: ${colors.primary};
    width: 110%;
    margin-left: -1rem;
    margin-right: -1rem;
    margin-bottom: -1rem;
    margin-top: 3rem;
    padding: 2rem 0;
}

@media (min-width: 760px){
    .hidde-in-desktop{
        display:none
    }
}
`
