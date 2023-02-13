import css from 'styled-jsx/css'

export default css`
.cards-grid{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
}

@media (min-width: 768px){
    .cards-grid{
        grid-template-columns: 1fr 1fr 1fr;
    }
}
`
