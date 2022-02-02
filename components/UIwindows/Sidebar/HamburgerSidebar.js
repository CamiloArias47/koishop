import { useState } from 'react'
import { useCommerce } from 'components/CommerceContext'
import Link from 'next/link'
import { RowIcon } from 'components/icons'
import Social from 'components/commons/social-icons'
import style from './style-user'

export const HamburgerViewSidebar = () => {

    const { categories } = useCommerce()

    return(
        <>
            <ul className='category-sidebar'>
                { categories.map( category => <CategoriesList category={category} key={ category.id } />) }
            </ul>
            <div className="social-wraper" >
             <Social />
            </div>
            <style jsx>{style}</style>
        </>
    )
}

function CategoriesList({category}){
    const [show, setShow ] = useState(false)

    const handlerShow = () => {
        setShow(!show)
    }

    return <li key={category.id} className={ show ? 'active' : ''}>
                <div className='category-item'>
                    <Link href={`/categoria/${category.id}`}>
                    <a>{category.name}</a>
                    </Link>
                    {
                        category.subcategories 
                        ? 
                          <button onClick={ handlerShow } className={ show ? 'row-up' : ''}>
                            <RowIcon height={32} width={32}/>
                          </button>
                        : ''
                    }
                </div>
                { show && category.subcategories 
                    ? <ul className='subcategory-list'>
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