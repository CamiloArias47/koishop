import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUI } from "components/UIcontext"

import { 
  getCategoryPaths, 
  getCategory,
  getCategories
} from 'firebaseApi/firestoreADMIN/category'

import { NextSeo } from 'next-seo'
import { useCommerce } from 'components/CommerceContext'
import CategorySlider from 'components/commons/categorySlider'

import { config } from 'components/commons/Head'
import BreadCrum from 'components/commons/breadcrum'

const CategoryPage = ({category, categories}) => {
  const router = useRouter()
  let { slug } = router.query

  const { displaySidebar,closeSidebar } = useUI()
  const { setCategories } = useCommerce()

  slug = (slug) ? slug : [] 
  
  let cat = slug.length > 0 ? slug[0] : ''
  let subcat = slug.length > 1 ? slug[1] : ''

  useEffect( ()=>{
    setCategories(categories)
  },[])

  useEffect( ()=>{
    if(displaySidebar){
      closeSidebar()
    }
  },[cat])
  
  return <div>
            <Seo name={category.name} config={config} photo={category.photo}/>
            <CategorySlider/>
            <BreadCrum links={[category.id]}/>
            Categoria: { slug[0] }, 
            Subcategoria: { subcat }
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
  
  let category = await getCategory(categoryName)

  if(!category){
    return { notFound: true }
  }

  const subcategories = category.subcategories

  if(slug.length > 1){
    //se pidio una pagina de una subcategoria
  }

  const categories = await getCategories()

  category.id = categoryName
  category.name =  categoryName.replace('-',' ')

  return {
    props: { 
      category,
      categories
    },
    revalidate: 200,
  }
}

export default CategoryPage