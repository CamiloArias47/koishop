import { useCommerce } from 'components/CommerceContext'
import Link from 'next/link'
import { useState } from 'react'
import style from './style-user'

export const HamburgerViewSidebar = () => {

    const { categories } = useCommerce()

    const list = categories.map( cat => {
        return <li key={cat.id}>
                 <Link href={`/categoria/${cat.id}`}>
                    <a>{cat.name}</a>
                 </Link>
                 {
                     cat.subcategories 
                        ? <SubcategoriesList 
                            subcategories={cat.subcategories} 
                            category={cat.id}/>
                        : ''
                 }
               </li>
    })

    return(
        <div>
            <ul className='category-sidebar'>
                {list}
            </ul>
            <style jsx>{style}</style>
        </div>
    )
}

function SubcategoriesList({subcategories, category }){
    const [show, setShow ] = useState(false)

    return <ul>
               {
                    subcategories.map(sub => {
                        return <li key={category + '-' + sub}>
                                    <Link href={`/categoria/${category}/${sub}`}>
                                        <a>{sub}</a>
                                    </Link>
                                </li>
                    })
               }
           </ul>
}