import { useRouter } from 'next/router'
import { firestore } from "firebase/admin"
import { replaceAll } from "utils"

import NextHead from "next/head"
import Image from 'next/image'

import style from 'styles/styles-product'

const ProductPage = (props) => {
  const router = useRouter()
  if(router.isFallback) return 'loading...'
  
  const { name, photo, description, price } = props.product
  const formatedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(price)

  return <section className="product-page-section">
            <NextHead>
              <title></title>
            </NextHead>

            <Image src={photo} alt={name} width='510' height='510' unoptimized/>
            <h1>{ name }</h1>
            <span className="product-price">{formatedPrice}</span>
            <p className="product-description">{description}</p>

            <style jsx>{style}</style>
         </section>
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

