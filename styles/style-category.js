import css from 'styled-jsx/css'

export default css`
.category-wrapper{
    padding:1rem;
}

.wraper-subcats-list{
    display:flex;
    flex-direction:column;
}

.wraper-subcats{
    display: none;
}

.wraper-list{
    width: 100%;
    min-height: 25rem;
}

.elemento-sapito{
    width:100%
}

@media (min-width: 768px){
    .category-wrapper{
        width: 80%;
        margin: auto;
        padding: 1rem 0;
    }

    .wraper-subcats-list{
        flex-direction: row;
        flex-wrap: wrap;
    }

    .wraper-subcats{
        display: flex;
        flex-flow:column wrap;
        width: 20%;
    }

    .wraper-list{
        width: 80%;
        
    }

    .float{
        width: 16%;
        height: 20rem;
        overflow-x: hidden;
    }
}

`