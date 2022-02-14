import { RowIcon } from 'components/icons'
import style from './style'

export default function BtnDropDown( { handlerClick = ()=>{}, show, ...props } ){
    return(
        <>
            <button 
                onClick={ handlerClick } 
                className={ show ? 'row-up' : ''}
                {...props}
            >
                    <RowIcon height={32} width={32} {...props} />
            </button>
            <style jsx>{ style }</style>
        </>
    )
}