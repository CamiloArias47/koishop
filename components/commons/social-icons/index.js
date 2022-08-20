import Image from 'next/image'
import facebookIcon from 'public/images/logos/facebook-white.svg'
import instagramIcon from 'public/images/logos/Instagram_icon.svg'
import tiktokIcon from 'public/images/logos/tiktok.svg'
import whatsappIcon from 'public/images/logos/whatsapp-white.svg'
import facebookIconGray from 'public/images/logos/facebook-black.svg'
import instagramIconGray from 'public/images/logos/Instagram-black.svg'
import tiktokIconGray from 'public/images/logos/tiktok-black.svg'
import whatsappIconGray from 'public/images/logos/whatsapp-black.svg'
import style from './style'

export default function Social({color='white', iconSize=32, showWhatsapp=true}){
    return(
        <ul>
            <li>
                <a href='https://www.facebook.com/KOI-Makeup-106154205135658' target="_blank" rel="noreferrer">
                    <Image 
                        src={color === 'white' ? facebookIcon : facebookIconGray}
                        alt="visita nuestro perfil de Facebook"
                        width={iconSize} height={iconSize}
                    />
                </a>
            </li>
            <li>
                <a href='https://www.instagram.com/koimakeup_/' target="_blank" rel="noreferrer">
                    <Image 
                        src={color === 'white' ? instagramIcon : instagramIconGray}
                        alt="visita nuestro perfil de Instagram"
                        width={ iconSize } height={ iconSize }
                    />
                </a>
            </li>
            <li>
                <a href='https://www.tiktok.com/@koimakeup_' target="_blank" rel="noreferrer">
                    <Image 
                        src={color === 'white' ? tiktokIcon : tiktokIconGray}
                        alt="visita nuestro perfil de Tiktok"
                        width={ iconSize } height={ iconSize }
                    />
                </a>
            </li>
            {
                showWhatsapp 
                ? <li>
                        <a href='https://wa.me/573153828317' target="_blank" rel="noreferrer">
                            <Image 
                                src={color === 'white' ? whatsappIcon : whatsappIconGray}
                                alt="Escribenos en Whatsapp"
                                width={ iconSize } height={ iconSize }
                            />
                        </a>
                    </li>
                : ''
            }
            
            <style jsx>{ style }</style>
        </ul>
    )
}