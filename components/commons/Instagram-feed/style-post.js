import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.instagram-post{
    width:250px;
    height:410px;
    border: 1px solid #dedede;
    border-radius: 8px;
    overflow: hidden;
    scroll-snap-align:start;
}

.instagram-post__header{
    background-color: ${ colors.white };
    display:flex;
    align-items:center;
}
.instagram-post__profile-conatiner{
    padding:.5rem;
}
:global(.instagram-post__profile-logo){
    border-radius:50%;
}

.instagram-post__image{
    position:relative;
    width:100%;
    height:76%;
}

:global(.instagram-image){
    object-fit: cover;
}

.instagram-post__footer{
    background-color:${ colors.white };
    padding: 1rem;
    font-size: .8rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.instagram-post__profile-name{
    font-weight:600;
}

@media (min-width:768px){
    .instagram-post{
    }
}

@media (min-width:1020px){

}
`