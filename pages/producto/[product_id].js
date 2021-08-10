import { useRouter } from 'next/router'

const ProductPage = () => {
  const router = useRouter()
  const { product_id } = router.query
  
  return <div>
            { product_id }
         </div>
}

export default ProductPage