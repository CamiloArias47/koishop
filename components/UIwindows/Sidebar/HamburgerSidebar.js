import { useState } from 'react'
import { useCommerce } from 'components/CommerceContext'
import Link from 'next/link'
import { RowIcon } from 'components/icons'
import style from './style-user'

export const HamburgerViewSidebar = () => {

    const { categories } = useCommerce()

    return(
        <div>
            <ul className='category-sidebar'>
                { categories.map( category => <CategoriesList category={category} key={ category.id } />) }
            </ul>
            <style jsx>{style}</style>
        </div>
    )
}

function CategoriesList({category}){
    const [show, setShow ] = useState(false)

    const handlerShow = event => {
        setShow(!show)
    }

    return <li key={category.id}>
                <div className='category-item'>
                    <Link href={`/categoria/${category.id}`}>
                    <a>{category.name}</a>
                    </Link>
                    {
                        category.subcategories 
                        ? 
                          <button data-cid={category.id} onClick={ handlerShow }>
                            <RowIcon height={32} width={32}/>
                          </button>
                        : ''
                    }
                </div>
                { show && category.subcategories 
                    ? <ul>
                            {
                                category.subcategories.map(sub => <SubcategoriesList cat={category.id} sub={sub} key={sub+'-'+category.id}/>)
                            }
                        </ul>
                    : ''
                }
            </li>
}

function SubcategoriesList({cat, sub }){
    return(
            <li key={cat + '-' + sub}>
                <Link href={`/categoria/${cat}/${sub}`}>
                    <a>{sub}</a>
                </Link>
            </li>
    )
        
}