import style from './style'

export default function ListProcess(){
    return(
        <ul className="proccess-list">
                <li>
                    <span className={'num-tab active'}>1</span>
                    <span className="title-tab">Revisión</span>
                </li>
                <li>
                    <span className="num-tab">2</span>
                    <span className="title-tab">Envio</span>
                </li>
                <li>
                    <span className="num-tab">3</span>
                    <span className="title-tab">Pago</span>
                </li>

                <style jsx>{style}</style>
            </ul>
    )
} 