import { ManagedCommerceContext } from 'components/CommerceContext'

import Image from 'next/image'
import styleHome from 'styles/style-home'
import CategorySlider from 'components/commons/categorySlider'
import ProductCard from 'components/commons/ProductCard'

import welcomeImage from 'public/images/welcomeImage.jpg'

import pic1 from 'public/images/pic.jpg'
import pic2 from 'public/images/pic2.jpg'
import salePic from 'public/images/sale.jpg'
import producto1 from 'public/images/producto1.jpg'
import producto7 from 'public/images/producto7.jpg'
import producto8 from 'public/images/producto8.jpg'
import producto9 from 'public/images/producto9.jpg'
import producto10 from 'public/images/producto10.jpg'
import producto11 from 'public/images/producto11.jpg'

export default function Home() {
  
  return (
    <div>
      <main className="main">
        
        <ManagedCommerceContext>
          <CategorySlider/>
        </ManagedCommerceContext>

        <section className="welcome-page">
          <Image 
            src={welcomeImage}
            alt="Welcome to Koi"
          />

          <div className="info-page">
            <div className="image-promo">
              <Image src={salePic}/>
            </div>
            <div className="info-page-card">
              <Image src={pic1}/>
              <div className="info-page-content">
                <h3>Envíos 🇨🇴 </h3>
                <p>Disponibles a toda Colombia</p>
              </div>
            </div>
            <div className="info-page-card">
              <Image src={pic2}/>
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
            <div className="cards-grid">
                <ProductCard name="Corrector De Alta Cobertura" img={producto1} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto7} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto8} price="$12.500"/>
                <ProductCard name="Primer Facial Skin Perfect" img={producto9} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto10} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto11} price="$12.500"/>
                <ProductCard name="Corrector Flawless Collection" img={producto1} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto7} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto8} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto9} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto10} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto11} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto1} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto7} price="$12.500"/>
                <ProductCard name="Polvo Compacto Khol" img={producto8} price="$12.500"/>
                <ProductCard name="Brochas Rosaly" img={producto9} price="$12.500"/>
            </div>
          </div>
        </section>

        <section className="disponible">
        
        </section>

        <footer>
          <div className="custom-shape-divider-top-1626050420">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                  <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                  <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
              </svg>
          </div>
         
        </footer>
      </main>
      

      <style jsx>{styleHome}</style>
    </div>
  )
}
