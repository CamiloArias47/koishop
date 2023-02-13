import style from './style'
import { CHECKOUT_STEP } from 'pages/pagar'

export default function ListProcess ({ current = CHECKOUT_STEP.revision, move }) {
  return (
        <ul className="proccess-list">
                <li>
                    <a className={current === CHECKOUT_STEP.revision ? 'active num-tab' : 'num-tab'}
                       onClick={() => { move(CHECKOUT_STEP.revision) }}>
                           1
                    </a>
                    <span className="title-tab">Revisión</span>
                </li>
                <li>
                    <a className={current === CHECKOUT_STEP.envio ? 'active num-tab' : 'num-tab'}
                       onClick={() => { move(CHECKOUT_STEP.envio) }}>
                           2
                    </a>
                    <span className="title-tab">Envio</span>
                </li>
                <li>
                    <a className={current === CHECKOUT_STEP.pago ? 'active num-tab' : 'num-tab'}
                       onClick={() => { move(CHECKOUT_STEP.pago) }}>
                           3
                    </a>
                    <span className="title-tab">Pago</span>
                </li>

                <style jsx>{style}</style>
            </ul>
  )
}
