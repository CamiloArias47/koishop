import { useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCommerce } from 'components/CommerceContext'
import { getProdustsHome, formatTimestampSSR } from 'firebaseApi/firestoreADMIN/products'
import { getCategories } from 'firebaseApi/firestoreADMIN/category'
import CategorySlider from 'components/commons/categorySlider'
import PromoSection from 'components/commons/home-landing'
import ProductsGrid from 'components/commons/ProductsGrid'
import welcomeImage from 'public/images/welcome-big.jpg'
import styleHome from 'styles/style-home'
import useLocalCategories from 'hooks/useLocalCategories'

const FooterDefer = dynamic(() => import('../components/commons/footer'), {
  suspense: true
})

export default function Home ({ categories, products }) {
  const { setCategories } = useCommerce()
  const { useSaveLocalCategory } = useLocalCategories()

  useEffect(() => {
    setCategories(categories)
  }, [])

  useSaveLocalCategory(categories)

  return (
    <div>
      <main className="main">

        <CategorySlider/>

        <section className="welcome-page">
          <div className='welcome-page__main-image'>
            <Image
              src={welcomeImage}
              alt="Welcome to Koi"
              placeholder="blur"
              priority
              layout="responsive"
            />
          </div>
          <PromoSection/>
        </section>

        <section className="products-container">
          <div className="products-section">
            <h2>Destacados</h2>
            <ProductsGrid products={products}/>
          </div>
        </section>

        <Suspense fallback={'Cargando...'} >
          <FooterDefer />
        </Suspense>
      </main>

      <style jsx>{styleHome}</style>
    </div>
  )
}

export async function getServerSideProps (context) {
  const categories = await getCategories()
  let products = await getProdustsHome()
  products = formatTimestampSSR({ products })

  return {
    props: {
      categories,
      products
    }
  }
}
