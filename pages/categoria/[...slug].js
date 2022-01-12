import { useRouter } from 'next/router'
import { useUI } from "components/UIcontext"
import { useEffect } from 'react'

const CategoryPage = () => {
  const router = useRouter()
  let { slug } = router.query

  const { displaySidebar,closeSidebar } = useUI()

  slug = (slug) ? slug : [] 
  
  let cat = slug.length > 0 ? slug[0] : ''
  let subcat = slug.length > 1 ? slug[1] : ''

  useEffect( ()=>{
    if(displaySidebar){
      closeSidebar()
    }
  },[cat])
  
  return <div>
            Categoria: { slug[0] }, 
            Subcategoria: { subcat }
         </div>
}

export default CategoryPage