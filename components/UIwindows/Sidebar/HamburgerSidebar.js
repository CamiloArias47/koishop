import { useCommerce } from 'components/CommerceContext'
import Link from 'next/link'
import style from './style-user'

export const HamburgerViewSidebar = () => {

    const { categories } = useCommerce()

    const list = categories.map( cat => {
        return <li key={cat.id}>
                 <Link href={`/categoria/${cat.id}`}>
                    <a>{cat.name}</a>
                 </Link>
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