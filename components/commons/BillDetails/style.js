import css from 'styled-jsx/css'
import { TRANSACTION_STATUS } from 'components/CommerceContext'
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

.ticket{
    background-color: ${colors.primaryUltraDim};
    padding: 1rem;
    position:relative;
    overflow:hidden;
    margin-bottom:2rem;
}
.ticket > h1{
    margin-top:1rem;
}
.ticket_border{
    width: 100%;
    height: 16px;
    background:#fff;
    background-size: 22%;
    background-repeat: round;
    position: absolute;
    left: 0;
    right: 0;
}
.ticket_border--top{
    background-image: url(../../images/logos/border-pink.png);
    top: 0;
}
.ticket_border--bottom{
    background-image: url(../../images/logos/border-bottom-pink.png);
    bottom: 0;
}

.wraper-table{
    display:none;
}

.ticket_item{
    display:flex;
    flex-direction:column;
    margin-bottom: 1rem;
}
.details-bills{
    margin-bottom:2rem;
}

.status{
    margin: 1rem 0;
    border: 1px solid ${colors.gray};
    border-radius: 10px;
    padding: 0.2rem 0.5rem;
    display: inline-block;
}

.status.${TRANSACTION_STATUS.ok}{
    border-color: ${colors.primaryDark};
    background-color: ${colors.primaryDim};
    color: ${colors.white};
}

.status.${TRANSACTION_STATUS.fail}{
    border-color: ${colors.red};
    background-color: ${colors.red};
    color: ${colors.white};
}
.status.${TRANSACTION_STATUS.incomplete},
.status.${TRANSACTION_STATUS.pending}{
    border-color: ${colors.alertDark};
    background-color: ${colors.alert};
    color: ${colors.white};
}

.status.${TRANSACTION_STATUS.ok}:after{
    content: ' ✔';
    color:${colors.greenDark};
}
.status.${TRANSACTION_STATUS.fail}:after{
    content: ' ❌';
    color:${colors.alert};
}
.status.${TRANSACTION_STATUS.incomplete}:after{
    content: ' ❕';
    color:${colors.alert};
}
.status.${TRANSACTION_STATUS.pending}:after{
    content: ' ⏳';
    color:${colors.alert};
}

.address-details :global(ul),
.user-bill-details :global(ul){
    list-style:none;
}

.address-details,
.user-bill-details{
    margin-top:3rem;
    width:100%;
}

@media (min-width: 768px){ 
    .ticket{
        padding:2rem;
    }
    .ticket_products{
        display:none;
    }
    .wraper-table{
        display:block;
    }
    .details-bills{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .8rem;
    }
    .ticket_border{
        background-size: 12%;
    }
}

@media (min-width: 1020px){ 
    .details-bills{
        display: flex;
        flex-direction: column;
    }
}

@media (min-width: 1200px){ 
    .ticket{
        padding: 1rem;
    }
    .ticket_border{
        background-size: 9%;
    }
    .details-bills{
        flex-direction: row;
    }
    .address-details,
    .user-bill-details{
        width:auto;
    }
}
`
