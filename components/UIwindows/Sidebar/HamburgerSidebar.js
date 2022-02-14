import { useState } from 'react'
import { useCommerce } from 'components/CommerceContext'
import Link from 'next/link'
import BtnDropDown from 'components/commons/button-drop-down'
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
                          <BtnDropDown 
                            handlerClick={handlerShow} 
                            show={ show } 
                        />
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