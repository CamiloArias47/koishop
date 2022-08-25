import css from 'styled-jsx/css'

export default css`
.instagram-slider{
    overflow:hidden;
    margin:auto;
    margin-bottom: 3rem;
    overflow-x:scroll;
    scroll-behavior:smooth;
    scroll-snap-type: x mandatory;
}

.instagram-slider::-webkit-scrollbar {
  display: none;
}

.instagram-feed{
    display: flex;
    margin: auto;
    gap: 1rem;
    width: max-content;
}

@media (min-width:768px){
    .instagram-feed{
    }
}

@media (min-width:1020px){
    .instagram-slider{
        width:80%;
    }
}

@media (min-width:1200px){
    .instagram-slider{
        width:990px;
    }
}
`