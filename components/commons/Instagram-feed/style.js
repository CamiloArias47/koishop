import css from 'styled-jsx/css'

export default css`
.instagram-feed{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    width: 100%;
    margin: auto;
    gap: 1rem;
}
.instagram-post{
    position:relative;
    width:100%;
    height:40vh;
}
:global(.instagram-image){
    object-fit: cover;
}

@media (min-width:768px){
    .instagram-feed{
        width: 100%;
        grid-template-columns: repeat(3,1fr);
    }
    .instagram-post{
        height:50vh;
    }
}

@media (min-width:1020px){
    .instagram-feed{
        width: 64%;
    }
}
`