import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.billcard{
    display: flex;
    flex-direction: column;
    padding: .5rem;
    border: 2px solid ${colors.primary}; 
    border-radius: 15px;
    background: ${colors.primaryUltraDim};
}
.billcard_header{
    display: flex;
    align-items:center;
    margin-bottom: 1rem;
}
.billcard_name{
    font-size: 1.2rem;
    font-weight: 500;
    margin-left:1rem;
}
@media (min-width:1200px){
    .billcard{
        width:max-content;
    }
}
`
