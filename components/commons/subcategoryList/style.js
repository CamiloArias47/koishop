import css from 'styled-jsx/css'
import { fontColor } from 'styles/theme'

export default css`
ul.subcategory-list{
    list-style: none;
    padding: 0;
}
ul.subcategory-list :global(li){
    color: ${ fontColor.general };
    padding: 6px 0;
}
`