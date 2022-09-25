import { useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { firestore } from "firebaseApi/admin"
import { getFirstTwentyProductsPaths } from "firebaseApi/firestoreADMIN/products"
import { replaceAll, formatPrice } from "utils"
import { useCart } from 'hooks/useCart'
import { useUI, SIDEBAR_VIEWS } from 'components/UIcontext'
import useLocalCategories from 'hooks/useLocalCategories'


import BreadCrum from 'components/commons/breadcrum'
import Footer from 'components/commons/footer'
import { config } from 'components/commons/Head'
import { ShoppingBagIcon, Spinner } from 'components/icons'
import ImagePreview from 'components/commons/Product/Product-image-preview'
import ColorOptions from 'components/commons/Product/colors'

import { colors as systemColors} from 'styles/theme'
import style from 'styles/styles-product'


const ProductPage = (props) => {
  const [ buyAmount, setBuyAmount ] = useState(1)
  const [ adding, setAdding ] = useState(false)
  const [ buyColor, setColor ] = useState('')
  const [ mainpicture, setMainpicture ] = useState(props.product.photo)
  const { addProduct } = useCart()
  const { useGetLocalCategories } = useLocalCategories()
  const { openToast, 
          setSidebarView,
          openSidebarFromRight
         } = useUI()
  
  let { id, name, photo, pictures, description, price, category, subcategory, amount, colors, timestamp} = props.product
  let colorSelector = null

  const formatedPrice = formatPrice(price)

  const descriptionHtml = { __html: description }

  if(colors) colors = colors.map( color => JSON.parse(color))
  
  useEffect( () => {
    if(amount <= 0){
      setBuyAmount(0)
    }
  },[])

  useGetLocalCategories()

  const handlerAmount = (event) => {
    const amountToBuy = event.target.value
    const totalToBuy = validateAmountToBuy({amountToBuy})
    if(totalToBuy <= 0) return false
    setBuyAmount(totalToBuy)
  }

  const handlerAddCart = (event) => {
    event.preventDefault()

    const validateAmoutData = { amountToBuy: buyAmount}

    let validateBuy = validateAmountToBuy(validateAmoutData)

    if(colors && buyColor === ''){
      openToast({msg:"Debes elegír un color"})
      return false
    }

    if(validateBuy > 0){
      setAdding(true)
      addProduct({id, name, price, buyAmount, photo, stock:amount, buyColor})
      setSidebarView(SIDEBAR_VIEWS.CART_VIEW)
      openSidebarFromRight()
      setAdding(false)
    }
  }

  const handlerColor = color => {
    let colorSelected = colors.find( colr => colr.name === color)
    if(buyAmount > colorSelected.amount){
      let msg = ''
      let newAmount = colorSelected.amount
      if(colorSelected.amount <= 0 ) msg = `No quedan unidades disponibles del color: ${color}`
      if(colorSelected.amount > 0 ) msg = `Solo quedan ${colorSelected.amount} unidades disponibles del color: ${color}`
      openToast({msg})

      if(colorSelected.amount <= 0 ) return false
      setBuyAmount(newAmount)
    } 
    setColor(color)
  }

  const validateAmountToBuy =  ({amountToBuy}) => {
    amountToBuy = parseInt(amountToBuy)
    let totalToBuy = amountToBuy
    let gramatic = amount > 1 ? 'disponibles' : 'disponible'
    let msg

    if(amount > 0){
       totalToBuy = (amountToBuy > amount) ? amount : amountToBuy 
       msg = `En este momento solo tenemos ${gramatic} ${amount} ${name}`
       if( colors ){
        let colorUsed = colors.find(color => color.name === buyColor)

        if(amountToBuy > colorUsed?.amount){
          totalToBuy = (amountToBuy > colorUsed.amount) ? colorUsed.amount : amountToBuy 
          msg = `solo quedan ${colorUsed.amount} unidades del color ${buyColor}`
          openToast({msg})
        } 
       }
    }
    else{
      totalToBuy = 0
      msg = 'Esta agotado por le momento'
    }

    if(amountToBuy > amount) openToast({msg})

    return totalToBuy
  }

  const iconBtn = adding 
                ? <Spinner width="38" height="38" color={systemColors.primaryDark} /> 
                : <ShoppingBagIcon width="32" height="32" color="#fff"/> 
  
  const changeMainImage = (url) => {
    setMainpicture(url)
  }

  if(colors){
    colorSelector = colors.map( color => {
                          return <ColorOptions 
                                    key={color.name+'-'+color.color} 
                                    color={color}
                                    activeColor={buyColor}
                                    selectColor={handlerColor}
                                  />
                        })
  } 

  return <>
        <section className="product-page-section wraper">
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
              <div className='product-image_main'>
                <Image 
                    src={mainpicture} 
                    alt={name} 
                    width='510' 
                    height='510' 
                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                    layout='responsive'
                    priority 
                />
              </div>
              {
                pictures ? <ImagePreview pics={[photo, ...pictures]} name={name} changeImage={ changeMainImage }/> : ''
              }
            </div>
            <div className="product-details">
              <h1>{ name }</h1>
              <span className="product-price">{formatedPrice}</span>
              <p className="product-description" dangerouslySetInnerHTML={descriptionHtml} />
              { (amount > 0 ) ?
                <form className="form-add" onSubmit={handlerAddCart}>
                  {
                    colorSelector 
                      ? <div className='form-add__top'>{colorSelector}</div> 
                      : null 
                  }
                  <div className='form-add__bottom'>
                    <div className="form-group">
                      <label htmlFor="cantidad-buy">Cantidad</label>
                      <input 
                        type="number" 
                        title="cantidad" 
                        id="cantidad-buy"  
                        className="input input-basic" 
                        value={buyAmount}
                        min="1"
                        onChange={handlerAmount}
                        required/>
                    </div>
                    <button className="btn btn-primary" disabled={adding}>
                      agregar 
                      {iconBtn}
                    </button>
                  </div>
                </form>
                : 
                <span className='no-stock-info'>
                  Producto agotado por el momento
                </span>
              }

            </div>
            <style jsx>{style}</style>
         </section>
         <Footer/>
      </>
}


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

  let products = await firestore
                        .collectionGroup("products")
                        .where('name','==',product_name)
                        .get()
  
  if( products.empty ){
    return { notFound: true }
  }
  
   let product = {}

   products.forEach( doc => {
        let timestamp = doc.data().timestamp
        timestamp = timestamp.toDate().toString()
        let data = { ...doc.data(), timestamp, id: doc.id }
        
        product = data
    });

    if(product.name === undefined) return { notFound: true }

    return {
      props: {product},
      revalidate: 200,
    }
}


export default ProductPage
