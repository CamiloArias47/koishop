import { useRouter } from 'next/router'

const CategoryPage = () => {
  const router = useRouter()
  let { slug } = router.query

  slug = (slug) ? slug : []
  let subcat = slug.length > 1 ? slug[1] : ''
  
  return <div>
            Categoria: { slug[0] }, 
            Subcategoria: { subcat }
         </div>
}

export default CategoryPage