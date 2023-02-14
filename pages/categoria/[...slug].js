import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useUI } from 'components/UIcontext'
import throttle from 'just-throttle'
import useGetCategoryProducts from 'hooks/useGetcategoryProducts'
import {
  getCategoryPaths,
  getCategory,
  getCategories
} from 'firebaseApi/firestoreADMIN/category'
import { getFirstProductsOfCategory, formatTimestampSSR } from 'firebaseApi/firestoreADMIN/products'
import { NextSeo } from 'next-seo'
import { useCommerce } from 'components/CommerceContext'
import useNearScreen from 'hooks/useNearScreen'
import CategorySlider from 'components/commons/categorySlider'
import SubcategoryList from 'components/commons/subcategoryList'
import ProductsGrid from 'components/commons/ProductsGrid'
import Footer from 'components/commons/footer'
import { config } from 'components/commons/Head'
import BreadCrum from 'components/commons/breadcrum'
import style from 'styles/style-category'

const CategoryPage = ({ category, categories, products }) => {
  const router = useRouter()
  const { asPath } = router
  let { slug } = router.query
  const [firstLoad, setFirstLoad] = useState(true)
  const [oldRote, setOldRoute] = useState(asPath)
  const thereIsProducts = products.length > 0
  const dateLastProduct = thereIsProducts ? products[products.length - 1].timestamp : ''

  const configusePaginate = {
    cid: category.id,
    startAt: dateLastProduct,
    subCat: category.isSub,
    firstProducts: products
  }

  const {
    productsState,
    lastProduct,
    paginate
  } = useGetCategoryProducts(configusePaginate)

  const { displaySidebar, closeSidebar } = useUI()
  const { setCategories } = useCommerce()
  const { isNearScreen, fromRef } = useNearScreen({ distance: '50px', once: false })

  slug = (slug) || []

  const cat = slug.length > 0 ? slug[0] : ''
  const subcat = slug.length > 1 ? slug[1] : ''

  const nameToShow = category.isSub
    ? category.isSub
    : category.name

  const linksBreadcrum = category.isSub
    ? [category.id, category.isSub]
    : [category.id]

  useEffect(() => {
    setFirstLoad(false)
    setCategories(categories)
  }, [])

  useEffect(() => {
    debounceHandlerNextPage.cancel()

    if (displaySidebar) {
      closeSidebar()
    }
    if (!firstLoad) {
      paginate({ getFromStart: true })
    }
  }, [cat, subcat])

  const debounceHandlerNextPage = useCallback(
    throttle(() => {
      paginate({ getFromStart: false, categoria: category.id })
    }, 5000, { leading: true }),
    [lastProduct, category])

  useEffect(() => {
    if ((isNearScreen && thereIsProducts) && asPath === oldRote) {
      debounceHandlerNextPage()
    }
    if (asPath !== oldRote) {
      setOldRoute(asPath)
    }
  }, [isNearScreen, debounceHandlerNextPage])

  return <div>
            <Seo name={nameToShow} config={config} photo={category.photo}/>
            <CategorySlider/>
            <section className='category-wrapper'>
              <BreadCrum links={linksBreadcrum}/>

              <div className='wraper-subcats-list'>
                  <div className='wraper-subcats'>
                    <div>
                      <h1>{category.name}</h1>
                      <SubcategoryList cid={category.id} subcategories={category.subcategories} />

                    </div>
                  </div>
                  <div className='wraper-list'>
                      <ProductsGrid products={productsState} />

                  </div>

                  <div ref={ fromRef } className='elemento-sapito'></div>
              </div>

            </section>
            <Footer />
            <style jsx>{style}</style>
         </div>
}

function Seo ({ name, config, photo }) {
  const title = config.title + ' ' + name
  return <NextSeo
            title={name + ' | ' + config.title}
            // description={description}
            openGraph={{
              type: 'website',
              title,
              // description: description,
              images: [
                {
                  url: photo,
                  width: 510,
                  height: 510,
                  alt: title
                }
              ]
            }}
          />
}

export async function getStaticPaths () {
  const paths = await getCategoryPaths()
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps (context) {
  const { params } = context
  const { slug } = params
  const categoryName = slug[0]
  let existSubCat = null

  const category = await getCategory(categoryName)

  if (!category) {
    return { notFound: true }
  }

  const subcategories = category.subcategories
  const subcategoryName = (slug.length > 1) ? slug[1] : undefined

  if (subcategoryName) {
    existSubCat = subcategories.find(sub => sub === subcategoryName)

    if (!existSubCat) {
      return { notFound: true }
    }
  }

  const categories = await getCategories()

  category.isSub = existSubCat
  category.id = categoryName
  category.name = categoryName.replaceAll('-', ' ')

  const consultProducts = {
    category: existSubCat ? subcategoryName : category.id,
    isSub: !!existSubCat
  }

  const products = await getFirstProductsOfCategory(consultProducts)

  const productsRes = formatTimestampSSR({ products })

  return {
    props: {
      category,
      categories,
      products: productsRes
    },
    revalidate: 200
  }
}

export default CategoryPage
