import { BillIcon } from 'components/icons'
import style from './style-billcard'

export default function BillCard ({ data }) {
  const {
    name,
    cedula,
    phone
  } = data

  return (
        <div className='billcard'>
            <div className='billcard_header'>
                <BillIcon/>
                <span className='billcard_name'>{ name }</span>
            </div>
            <span>CC: { cedula }</span>
            <span>Telefono: { phone }</span>
            <style jsx>{ style }</style>
        </div>
  )
}
