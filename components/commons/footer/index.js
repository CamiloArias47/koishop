import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BtnDropDown from 'components/commons/button-drop-down'
import Social from 'components/commons/social-icons'
import whatsappIcon from 'public/images/logos/whatsapp-black.svg'
import style from './style'
import InstagramFeed from '../Instagram-feed'

export default function Footer () {
  const [showContact, setShowContact] = useState(false)
  const [showHowAreWe, setShowHowAreWe] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const handlerShow = event => {
    const btn = event.target.dataset.btn
    if (btn === 'contact') setShowContact(prev => !prev)
    if (btn === 'howarewe') setShowHowAreWe(prev => !prev)
    if (btn === 'help') setShowHelp(prev => !prev)
  }

  return <footer>
                <section className="degradado">
                    <div className='wraper-degradado'>
                        <InstagramFeed/>
                    </div>
                </section>
                <div style={{ position: 'relative' }}>
                    <div className="custom-shape-divider-top-1626050420">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                        </svg>
                    </div>
                </div>
                <div className='footer'>
                    <div className='wraper-info-footer'>
                            <div className='contact'>
                                <span>
                                    CONTACTO
                                    <BtnDropDown
                                        handlerClick={handlerShow}
                                        show={ showContact }
                                        data-btn="contact"
                                    />
                                </span>
                                <ul className={ showContact ? 'show-height' : ''}>
                                    <li className='whatsapp-li'>
                                        <a href='https://wa.me/573153828317' target="_blank" rel="noreferrer">
                                            <Image src={whatsappIcon} width="22" height="22"/>
                                            <span>315 3828317</span>
                                        </a>
                                    </li>
                                    <li>
                                        Escribenos:<br/>
                                        koimaquillaje@gmail.com
                                    </li>
                                </ul>
                            </div>
                            <div className='ayuda'>
                                <span>
                                    AYUDA
                                    <BtnDropDown
                                        handlerClick={handlerShow}
                                        show={ showHelp }
                                        data-btn="help"
                                    />
                                </span>
                                <ul className={ showHelp ? 'show-height' : ''}>
                                    <li>Envíos</li>
                                    <li>
                                        <Link href="/garantias">
                                            <a>Cambios y garantías </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terminos-y-condiciones">
                                            Términos y condiciones
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/politica-de-privacidad">
                                            Política de privacidad
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/creditos">
                                            Créditos
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='quienes-somos'>
                                <span>
                                    QUIENES SOMOS
                                    <BtnDropDown
                                        handlerClick={handlerShow}
                                        show={ showHowAreWe }
                                        data-btn="howarewe"
                                    />
                                </span>
                                <ul className={ showHowAreWe ? 'show-height' : ''}>
                                    <li>Conócenos</li>
                                </ul>
                            </div>

                            <div className='sociales'>
                                <span>SIGUENOS</span>
                                <Social color='gray'iconSize={22} showWhatsapp={false}/>
                            </div>
                            <div className='heart'>
                                Koi Makeup - Cali, Colombia. Con 🧡
                            </div>
                    </div>
                </div>
                <style jsx>{ style }</style>
           </footer>
}
