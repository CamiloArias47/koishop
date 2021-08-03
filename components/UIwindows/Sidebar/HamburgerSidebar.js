import { useCommerce } from 'components/CommerceContext'

export const HamburgerViewSidebar = () => {

    const { categories } = useCommerce()

    const list = categories.map( cat => (<li key={cat.id}><a>{cat.name}</a></li>))

    return(
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}