import css from 'styled-jsx/css'
import {TRANSACTION_STATUS} from 'components/CommerceContext'
import { colors, fontColor } from 'styles/theme'

export default css`
h1{
    color:${fontColor.important}
}
.date{
    display:block;
    margin-top:1rem;
}
.head-description{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}

.head-description .go-back-pedidos a{
    display: flex;
    align-items: center;
}

.head-description h1{ 
    padding-top:2rem;
}

.status{
    margin-top: 1rem;
    border: 1px solid ${colors.gray};
    border-radius: 10px;
    padding:.2rem .5rem;
    position: absolute;
    margin-top: 0.5rem;
}

.status.${TRANSACTION_STATUS.ok}{
    border-color: ${colors.primaryDark};
    background-color: ${colors.primaryDim};
    color: ${colors.white};
}

/* .status.${TRANSACTION_STATUS.incomplete}{
    border-color: ${colors.alert};
    background-color: ${colors.alertDark};
    color: ${colors.white};
} */

.status.${TRANSACTION_STATUS.fail},
.status.${TRANSACTION_STATUS.incomplete}{
    border-color: ${colors.red};
    background-color: ${colors.red};
    color: ${colors.white};
}

.status.${TRANSACTION_STATUS.ok}:after{
    content: ' ✔';
    color:${colors.greenDark}
}
.status.${TRANSACTION_STATUS.fail}:after,
.status.${TRANSACTION_STATUS.incomplete}:after{
    content: ' ❌';
    color:${colors.greenDark}
}


.address-details,
.user-bill-details{
    margin-top:3rem;
    width:100%;
}

@media (min-width: 768px){
    .details-bills{
        display:flex;
    }
    .address-details,
    .user-bill-details{
        width:50%;
    }
}
`