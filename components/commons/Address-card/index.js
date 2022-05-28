import {HomeIcon} from 'components/icons'
import style from './style'

export default function AddressCard({direction}){
    const { 
        address,
        department,
        city,
        addresscomplement,
        neighborhood,
        nextToAddress
    } = direction

    return (
        <div className="addresscard">
            <div className="addresscard_header">
                <HomeIcon/> 
                <span className='addresscard_direction'>{ address }</span>
            </div>
            <span>{ department } - { city }</span>
            <span>{ addresscomplement }</span>
            <span>{ neighborhood }</span>
            <span>{ nextToAddress }</span>
            <style jsx>{ style }</style>
        </div>
    )
}