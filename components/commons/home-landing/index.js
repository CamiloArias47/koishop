import Image from 'next/image'
import Link from 'next/link'
import ruborImg from 'public/images/rubor.png'
import pic1 from 'public/images/pic.jpg'
import pic2 from 'public/images/pic2.jpg'
import paletaImg from 'public/images/paleta-pina-colada.png'

import style from './style'

export default function PromoSection(){
    return(
        <div className="info-page">
            <div className="info-page__product-main">
                <div className="info-page__title">
                  <h1>Nuevo</h1>
                  <h1>Love Blush</h1>
                  <Link href="/producto/Balaca-conejo">
                    <a className='btn btn-promo'> Comprar ahora</a>
                  </Link>
                </div>
                <div className="info-page__image">
                  <Image src={ruborImg} alt="Nuevo rubor" placeholder="blur"/>
                </div>
            </div>
            <div className='info-page-card info-page-card--main'>
              <div className='info-card__content'>
                  <div className='info-card__main-text'>
                    <h1 className='main-text__first'>
                      15%
                      <span>Descuento</span>
                    </h1>
                    <h1 className='main-text__second'>
                      Piña Colada 
                      <span> Paleta De Sombras</span>
                    </h1>
                  </div>
              </div>
              <div className="image-promo">
                <Image src={paletaImg} alt="paleta piña colada" placeholder="blur" layout="responsive"/>
              </div>
            </div>
            <div className="info-page-card">
              <Image src={pic1} alt="promo imagen" placeholder="blur" layout="responsive"/>
              <div className="info-page-content">
                <h3>Envíos 🇨🇴 </h3>
                <p>Disponibles a toda Colombia</p>
              </div>
            </div>
            <div className="info-page-card">
              <Image src={pic2} alt="promo imagen" placeholder="blur" layout="responsive"/>
              <div className="info-page-content">
                <h3>Calidad 💄</h3>
                <p>Los mejores productos</p>
              </div>
            </div>
            <style jsx>{ style }</style>
        </div>
    )
}