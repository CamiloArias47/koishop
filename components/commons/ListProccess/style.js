import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
.proccess-list{
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    position:relative;
}

.proccess-list li{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px solid #cf9696;
    width: 33.33%;
    font-weight: 600;
}

.proccess-list li .num-tab{
    background: white;
    border: 2px solid #cf9696;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: relative;
    top: -1.1rem;
    text-align: center;
    padding-top: .2rem;
}

.proccess-list li .num-tab.active{
    background: ${colors.primary};
    color:white;
}

.proccess-list li .title-tab{
    position: relative;
    top: -.9rem;
}
`