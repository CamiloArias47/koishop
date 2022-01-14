import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { firestore } from "firebaseApi/admin"
import { getFirstTwentyProductsPaths } from "firebaseApi/firestoreADMIN/products"
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
  
  const { id, name, photo, description, price, category, subcategory, amount} = props.product
  const formatedPrice = formatPrice(price)

  useEffect( () => {
    if(amount <= 0){
      setBuyAmount(0)
    }
  },[])

  const handlerAmount = (event) => {
    const amountToBuy = event.target.value
    const totalToBuy = validateAmountToBuy({amountToBuy})
    setBuyAmount(totalToBuy)
  }

  const handlerAddCart = (event) => {
    event.preventDefault()

    const validateAmoutData = { amountToBuy: buyAmount}

    let validateBuy = validateAmountToBuy(validateAmoutData)

    if(validateBuy > 0){
      setAdding(true)
      addProduct({id, name, price, buyAmount, photo, stock:amount})
      setSidebarView(SIDEBAR_VIEWS.CART_VIEW)
      openSidebarFromRight()
      setAdding(false)
    }
  }

  const validateAmountToBuy =  ({amountToBuy}) => {
    let totalToBuy = amountToBuy
    let gramatic = amount > 1 ? 'disponibles' : 'disponible'
    let msg

    if(amount > 0){
       totalToBuy = (amountToBuy > amount) ? amount : amountToBuy 
       msg = `En este momento solo tenemos ${gramatic} ${amount} ${name}`
    }
    else{
      totalToBuy = 0
      msg = 'Esta agotado por le momento'
    }

    if(amountToBuy > amount) openToast({msg})

    return totalToBuy
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
              { (amount > 0 ) ?
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
                : 
                <span className='no-stock-info'>
                  Producto agotado por el momento
                </span>
              }

            </div>

            <style jsx>{style}</style>
         </section>
}

export default ProductPage

export async function getStaticPaths() {

  const productPaths = await getFirstTwentyProductsPaths()

  return { 
    paths : productPaths, 
    fallback: 'blocking'
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
        querySnapshot.forEach( doc => {
            product = {id: doc.id, ...doc.data()}
        });

        if(product.name === undefined) return { notFound: true }

        return {
          props: {product},
          revalidate: 200,
        }
    })
    .catch(error => {
      return { notFound: true }
    })

}

