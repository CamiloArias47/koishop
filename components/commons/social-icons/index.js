import Image from 'next/image'
import facebookIcon from 'public/images/logos/facebook-white.svg'
import instagramIcon from 'public/images/logos/Instagram_icon.svg'
import tiktokIcon from 'public/images/logos/tiktok.svg'
import whatsappIcon from 'public/images/logos/whatsapp-white.svg'
import style from './style'

export default function Social(){
    return(
        <ul>
            <li>
                <a href='https://www.facebook.com/KOI-Makeup-106154205135658' target="_blank" rel="noreferrer">
                    <Image 
                        src={facebookIcon}
                        alt="visita nuestro perfil de Facebook"
                        width="32" height="32"
                    />
                </a>
            </li>
            <li>
                <a href='https://www.instagram.com/koiimakeup/' target="_blank" rel="noreferrer">
                    <Image 
                        src={instagramIcon}
                        alt="visita nuestro perfil de Instagram"
                        width="32" height="32"
                    />
                </a>
            </li>
            <li>
                <a href='https://www.tiktok.com/@koi_makeup' target="_blank" rel="noreferrer">
                    <Image 
                        src={tiktokIcon}
                        alt="visita nuestro perfil de Tiktok"
                        width="32" height="32"
                    />
                </a>
            </li>
            <li>
                <a href='https://wa.me/573153828317' target="_blank" rel="noreferrer">
                    <Image 
                        src={whatsappIcon}
                        alt="Escribenos en Whatsapp"
                        width="32" height="32"
                    />
                </a>
            </li>
            <style jsx>{ style }</style>
        </ul>
    )
}