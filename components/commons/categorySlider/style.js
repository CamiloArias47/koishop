import css from 'styled-jsx/css'

export default css`

.slider{
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
}

.slider button{
    display:none;
}

.container-category-slider{
    overflow-x: scroll;
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    padding-top:.5rem;
    scrollbar-width: none;
    
}

.container-category-slider::-webkit-scrollbar {
  display: none;
}

.category-slide{
    padding-right:1rem;
    text-align: center;
    max-width: 82px;
    transition: transform 1s ease;
}

.category-circle{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 3px solid #ececec;
    background: #fbfbfb;
    -webkit-box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62); 
    box-shadow: -1px 3px 7px -1px rgba(0,0,0,0.62);
}

.category-circle :global(.category-slide-image){
    border-radius:50%;
}

.category-title{
    padding-top: .2rem;
    font-size: .8rem;
    color: dimgray;
}

@media (min-width:1020px){
    .container-category-slider{
        width:50%;
    }

    .slider button{
        display:block;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-bottom: 35px;
        margin-left: 15px;
        margin-right: 15px;
        border: 3px solid #ececec;
        background: #fbfbfb;
        -webkit-box-shadow: -1px 3px 7px -1px rgb(0 0 0 / 62%);
        box-shadow: -1px 3px 7px -1px rgb(0 0 0 / 62%);
    }

    .slider button:hover{
        cursor:pointer;
        box-shadow: -1px 3px 7px -1px rgb(0 0 0 / 100%);
    }

    .slider button > :global(svg){
        margin-left: -60%;
        margin-top: -20%;
    } 

    .slider button > :global(svg.to-right){
        transform: rotate(0.5turn);
    }
}
`