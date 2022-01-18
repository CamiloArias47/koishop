import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useUI } from "components/UIcontext"

import debounce from 'just-debounce-it'

import { 
  getCategoryPaths, 
  getCategory,
  getCategories
} from 'firebaseApi/firestoreADMIN/category'

import { getFirstProductsOfCategory } from 'firebaseApi/firestoreADMIN/products'
import { getSecondPage } from 'firebaseApi/firestoreDB/productsPaginator'

import { NextSeo } from 'next-seo'
import { useCommerce } from 'components/CommerceContext'
import  useNearScreen  from 'hooks/useNearScreen'

import CategorySlider from 'components/commons/categorySlider'
import SubcategoryList from 'components/commons/subcategoryList'
import ProductsGrid from 'components/commons/ProductsGrid'

import { config } from 'components/commons/Head'
import BreadCrum from 'components/commons/breadcrum'
import style from 'styles/style-category'


const CategoryPage = ({category, categories, products}) => {
  const router = useRouter()
  let { slug } = router.query

  const [ addProducts, setAddProducts ] = useState([])
  const [ numberRender, serNumberRender ] = useState(1)
  const [ productsState, setProducts ] = useState(products)
  const [ lastProduct, setLastProduct ] = useState( products[ products.length -1].timestamp )

  const { displaySidebar,closeSidebar } = useUI()
  const { setCategories } = useCommerce()
  const { isNearScreen, fromRef } = useNearScreen( { distance: '50px', once:false } )

  slug = (slug) ? slug : [] 
  
  let cat = slug.length > 0 ? slug[0] : ''
  let subcat = slug.length > 1 ? slug[1] : ''

  const nameToShow = category.isSub 
                      ? category.isSub 
                      : category.name

  const linksBreadcrum = category.isSub 
                          ? [ category.id, category.isSub ]
                          : [ category.id ]

  useEffect( ()=>{
    setCategories(categories)
  },[])

  useEffect( ()=>{
    if(displaySidebar){
      closeSidebar()
    }
  },[cat])

  // const deboundeFunc = debounce( () => {
  //   console.log('call products')
  //   handlerNextPage()
  // } , 1000)

  const debounceHandlerNextPage =  useCallback( debounce( () => { 
      handlerNextPage() 
    } , 500 ) ,[lastProduct])
    
  const handlerNextPage = () => {

    let lastPtoStart = typeof lastProduct.timestamp === 'string' 
                      ? new Date(lastProduct.timestamp)
                      : lastProduct 
    console.log({numberRender})

    getSecondPage({ 
      category: category.id, 
      startPageAt: lastPtoStart, 
      isSub : category.isSub,
      firstReq : numberRender === 1 ? true : false
    }).then( nextProducts => {
      if(nextProducts.products.length > 0){
        // let newProducts = <ProductsGrid key={'ultimo-'+numberRender+'-'+nextProducts.products.at(-1).id} products={nextProducts.products} />
        // setAddProducts( [...addProducts, newProducts ])
        setProducts([ ...productsState, ...nextProducts.products ])
        const lastp = nextProducts.lastVisible
        setLastProduct( lastp )
      }
    })
    serNumberRender( numberRender + 1 )
  }


  useEffect( () => {
    if( isNearScreen ){
      debounceHandlerNextPage()
    }
  }, [isNearScreen, debounceHandlerNextPage])
  
  return <div>
            <Seo name={nameToShow} config={config} photo={category.photo}/>
            <CategorySlider/>
            <section className='category-wrapper'>
              <BreadCrum links={linksBreadcrum}/>

              <div className='wraper-subcats-list'>
                  <div className='wraper-subcats'>
                    <div className='float'>
                      <h1>{category.name}</h1>
                      <SubcategoryList cid={category.id} subcategories={category.subcategories} />
        
                    </div>
                  </div>
                  <div className='wraper-list'>
                      <ProductsGrid products={productsState} />
                      
                      <div ref={ fromRef } >
                        Elemento sapito 🐸
                      </div>
                  </div>
              </div>

            </section>
            <style jsx>{style}</style>
         </div>
}

function Seo({name, config, photo}){
  const title = config.title + ' ' + name
  return <NextSeo
            title={name+' | '+config.title}
            //description={description}
            openGraph={{
              type: 'website',
              title,
              //description: description,
              images: [
                {
                  url: photo,
                  width: 510,
                  height: 510,
                  alt: title,
                },
              ],
            }}
          />
}


export async function getStaticPaths() {

  const paths = await getCategoryPaths()

  return { 
    paths, 
    fallback: 'blocking'
  }
}


export async function getStaticProps(context){
  const { params } = context 
  let { slug } = params
  const categoryName = slug[0]
  let existSubCat = null 

  let category = await getCategory(categoryName)
  

  if( !category ){
    return { notFound: true }
  }

  const subcategories = category.subcategories
  const subcategoryName  = (slug.length > 1) ? slug[1] : undefined

  if( subcategoryName ){
     existSubCat = subcategories.find( sub => sub === subcategoryName)
    
     if( !existSubCat ){
       return { notFound: true }
     }
  }


  
  const categories = await getCategories()
  
  category.isSub = existSubCat
  category.id = categoryName
  category.name =  categoryName.replace('-',' ')

  const consultProducts = {
    category : existSubCat ? subcategoryName : category.id, 
    isSub: existSubCat ? true : false
  }

  const products = await getFirstProductsOfCategory( consultProducts )

  const productsRes = products.map( p => {

    let timestamp = p.timestamp

    timestamp = timestamp.toDate().toString()
    return { ...p , timestamp }
    
  })

  return {
    props: { 
      category,
      categories,
      products : productsRes
    },
    revalidate: 200,
  }
}

export default CategoryPage