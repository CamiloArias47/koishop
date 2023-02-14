import Image from 'next/image'
import creditCardLeft from 'public/images/card-fail-left.png'
import creditCardRight from 'public/images/card-fail-right.png'
import style from './style'

export default function FailCredictCard () {
  return (
        <div className='animation'>
            <div className='animation__card animation__card--left'>
                <Image src={creditCardLeft} alt="tarjeta rota" layout="responsive" />
            </div>
            <div className='animation__card animation__card--right'>
                <Image src={creditCardRight} alt="tarjeta rota" layout="responsive" />
            </div>
            <div className='animation__circle'></div>
            <style jsx>{ style }</style>
        </div>
  )
}
