import { useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCommerce } from 'components/CommerceContext'
import { getProdustsHome, formatTimestampSSR } from 'firebaseApi/firestoreADMIN/products'
import { getCategories } from 'firebaseApi/firestoreADMIN/category'
import CategorySlider from 'components/commons/categorySlider'
import ProductsGrid from 'components/commons/ProductsGrid'
import welcomeImage from 'public/images/welcome-big.jpg'
import pic1 from 'public/images/pic.jpg'
import pic2 from 'public/images/pic2.jpg'
import salePic from 'public/images/sale.jpg'
import styleHome from 'styles/style-home'
import useLocalCategories from 'hooks/useLocalCategories'


const FooterDefer = dynamic(() => import('../components/commons/footer'), {
  suspense: true
})


export default function Home({categories, products}) {

  const { setCategories } = useCommerce()
  const { useSaveLocalCategory } = useLocalCategories()

  useEffect( ()=>{
    setCategories(categories)
  },[])

  useSaveLocalCategory(categories)
  
  return (
    <div>
      <main className="main">
        

        <CategorySlider/>
        

        <section className="welcome-page">
          <Image 
            src={welcomeImage}
            alt="Welcome to Koi"
            placeholder="blur"
            priority
            layout="responsive"
          />

          <div className="info-page">
            <div className="image-promo">
              <Image src={salePic} alt="promo imagen" placeholder="blur"/>
            </div>
            <div className="info-page-card">
              <Image src={pic1} alt="promo imagen" placeholder="blur"/>
              <div className="info-page-content">
                <h3>Envíos 🇨🇴 </h3>
                <p>Disponibles a toda Colombia</p>
              </div>
            </div>
            <div className="info-page-card">
              <Image src={pic2} alt="promo imagen" placeholder="blur"/>
              <div className="info-page-content">
                <h3>Calidad 💄</h3>
                <p>Los mejores productos</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="products-container">
          <div className="products-section">
            <h2>Destacados</h2>
            <ProductsGrid products={products}/>
          </div>
        </section>

        <Suspense fallback={`Cargando...`} >
          <FooterDefer />
        </Suspense>
      </main>
      

      <style jsx>{styleHome}</style>
    </div>
  )
}



export async function getServerSideProps(context) {
  const { req, res } = context

  const categories = await getCategories()
  let products = await getProdustsHome()
  products = formatTimestampSSR({products})

  return { props: { 
              categories, 
              products
            } 
          }
}
