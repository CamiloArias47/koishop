import Link from 'next/link'

import { HomeIcon } from 'components/icons'

import style from './style'

export default function BreadCrum({links}){
    return <ul className="breadcrum">
                 <li>
                     <Link href="/">
                         <a><HomeIcon width="22" height="22"/></a>
                     </Link>
                 </li>
                { links.map( link => <li key={link}>{link} </li>) }

                 <style jsx>{style}</style>
           </ul>
}