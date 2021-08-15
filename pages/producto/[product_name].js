import { useRouter } from 'next/router'
import { firestore } from "firebase/admin"
import { replaceAll } from "utils"

import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { config } from 'components/commons/Head'
import { CarIcon } from 'components/icons'
import style from 'styles/styles-product'

const ProductPage = (props) => {
  const router = useRouter()
  if(router.isFallback) return 'loading...'
  
  const { name, photo, description, price } = props.product
  const formatedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0, minimumFractionDigits: 0, }).format(price)

  return <section className="product-page-section">
            <NextSeo
              title={name+' | '+config.title}
              description={description}
              openGraph={{
                type: 'website',
                title: name,
                description: description,
                images: [
                  {
                    url: photo,
                    width: 510,
                    height: 510,
                    alt: name,
                  },
                ],
              }}
            />

            <div className="product-image">
              <Image src={photo} alt={name} width='510' height='510'/>
            </div>
            <div className="product-details">
              <h1>{ name }</h1>
              <span className="product-price">{formatedPrice}</span>
              <p className="product-description">{description}</p>
              <form className="form-add">
                <div className="form-group">
                  <label htmlFor="cantidad-buy">Cantidad</label>
                  <input type="number" title="cantidad" id="cantidad-buy"  className="input input-basic" required/>
                </div>
                <button className="btn btn-primary">
                  agregar al carrito
                  <CarIcon width="32" height="32"/>
                </button>
              </form>
            </div>

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
  return firestore
    .collectionGroup("products")
    .where('name','==',product_name)
    .get()
    .then((querySnapshot) => {
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

