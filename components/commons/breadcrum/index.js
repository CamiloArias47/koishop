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
                { links.map( (link, index) => {

                        let name = link.replace('-',' ') 

                        const route = (index === 0) 
                                        ?  `/categoria/${link}`
                                        : `/categoria/${links[0]}/${link}`

                        return <li key={link}>
                                    <Link href={route}>
                                        <a>{name}</a>
                                    </Link>
                                </li>
                    }) 
                }

                 <style jsx>{style}</style>
           </ul>
}