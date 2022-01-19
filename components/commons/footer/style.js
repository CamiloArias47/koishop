import css from 'styled-jsx/css'

export default css`

footer{
    position: relative;
    padding-top: 1rem;
    width: 100%;
}

.degradado{
    width:100%;
    height:150px;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(207,150,150,0.7987570028011204) 61%, rgba(207,150,150,1) 100%);
}

.wraper-degradado{
    padding:1rem;
    display:flex;
}

.wraper-degradado div{
    width:50%;
    text-align: center;
}

.custom-shape-divider-top-1626050420 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-top-1626050420 svg {
    position: relative;
    display: block;
    margin-top: -1px;
    width: calc(100% + 1.3px);
    height: 120px;
    transform: rotateY(180deg);
}

.custom-shape-divider-top-1626050420 .shape-fill {
    fill: #CF9696;
}


    
@media (max-width: 767px) {
    .custom-shape-divider-top-1626050420 svg {
        width: calc(138% + 1.3px);
        height: 67px;
    }
}
`