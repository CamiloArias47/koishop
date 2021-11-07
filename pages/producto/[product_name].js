import { useState } from 'react'
import { useRouter } from 'next/router'
import { firestore } from "firebaseApi/admin"
import { replaceAll, formatPrice } from "utils"
import { useCart } from 'hooks/useCart'
import { useUI, SIDEBAR_VIEWS } from 'components/UIcontext'

import { NextSeo } from 'next-seo'
import Image from 'next/image'

import BreadCrum from 'components/commons/breadcrum'
import { config } from 'components/commons/Head'
import { ShoppingBagIcon, Spinner } from 'components/icons'
import { colors } from 'styles/theme'
import style from 'styles/styles-product'

const ProductPage = (props) => {
  const router = useRouter()
  const [ buyAmount, setBuyAmount ] = useState(1)
  const [ adding, setAdding ] = useState(false)
  const { addProduct } = useCart()
  const { openToast, 
          setSidebarView,
          openSidebarFromRight
         } = useUI()
  
  if(router.isFallback) return 'loading...'

  const { id, name, photo, description, price, category, subcategory, amount} = props.product
  const formatedPrice = formatPrice(price)

  const handlerAmount = (event) => {
    let wantBuy = event.target.value
    let totalToBuy = (wantBuy > amount) ? amount : wantBuy 
    let gramatic = amount === 1 ? 'disponible' : 'disponibles'

    if(wantBuy > amount) openToast({msg:`En este momento solo tenemos ${gramatic} ${amount} ${name}`})
    
    setBuyAmount(totalToBuy)
  }

  const handlerAddCart = (event) => {
    event.preventDefault()
    setAdding(true)

    addProduct({id, name, price, buyAmount, photo, stock:amount})
    setSidebarView(SIDEBAR_VIEWS.CART_VIEW)
    openSidebarFromRight()
    setAdding(false)

  }

  const iconBtn = adding 
                      ? <Spinner width="38" height="38" color={colors.primaryDark} /> 
                      : <ShoppingBagIcon width="32" height="32" color="#fff"/> 
  

return <section className="product-page-section wraper">
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

            <BreadCrum links={[category, subcategory]}/>

            <div className="product-image">
              <Image 
                  src={photo} 
                  alt={name} 
                  width='510' 
                  height='510' 
                  unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                  priority />
            </div>
            <div className="product-details">
              <h1>{ name }</h1>
              <span className="product-price">{formatedPrice}</span>
              <p className="product-description">{description}</p>
              <form className="form-add" onSubmit={handlerAddCart}>
                <div className="form-group">
                  <label htmlFor="cantidad-buy">Cantidad</label>
                  <input 
                    type="number" 
                    title="cantidad" 
                    id="cantidad-buy"  
                    className="input input-basic" 
                    value={buyAmount}
                    onChange={handlerAmount}
                    required/>
                </div>
                <button className="btn btn-primary" disabled={adding}>
                  agregar 
                  {iconBtn}
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

