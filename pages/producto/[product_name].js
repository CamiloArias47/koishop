import { useRouter } from 'next/router'
import { firestore } from "firebase/admin"
import { replaceAll } from "utils"

const ProductPage = (props) => {
  const router = useRouter()
  if(router.isFallback) return 'loading...'
  
  return <div>
            { props.product.name }
         </div>
}

export default ProductPage

export async function getStaticPaths() {
  const paths = [{ params: { product_name: 'Aro-Led-Selfie'} }]
  //const paths = []
  return { 
    paths, 
    fallback: true
  }
}

export async function getStaticProps(context) {
  const { params } = context 
  let { product_name } = params
  product_name = replaceAll(product_name,'-',' ')
  console.log({product_name})
  return firestore
    .collectionGroup("products")
    .where('name','==',product_name)
    .get()
    .then((querySnapshot) => {
        console.log({querySnapshot})
        let product = {}
        querySnapshot.forEach((doc) => {
            product = {id: doc.id, ...doc.data()}
        });

        if(product.name === undefined) return { notFound: true }

        return {
          props: {product},
        }
    })
    .catch(error => {
      return {
        props: {},
      }
    })

}

