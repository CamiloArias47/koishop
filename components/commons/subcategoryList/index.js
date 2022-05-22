import Link from 'next/link'
import style from './style'
import { cleanGionsInName } from 'utils'

export default function SubcategoryList( {cid, subcategories} ){
    let list = ''

    if(subcategories){
        list = subcategories.map( sub => {
            return <li key={sub}>
                     <Link href={`/categoria/${cid}/${sub}`}>
                        <a>{cleanGionsInName( sub )}</a>
                      </Link>
                    </li>
          }) 
    }

    return <ul className='subcategory-list'>
            {list}
            <style jsx>{style}</style>
           </ul>
}