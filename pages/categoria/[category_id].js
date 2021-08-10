import { useRouter } from 'next/router'

const CategoryPage = () => {
  const router = useRouter()
  const { category_id } = router.query
  
  return <div>
            { category_id }
         </div>
}

export default CategoryPage