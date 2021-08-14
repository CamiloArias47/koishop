import Image from 'next/image'
import error404 from 'public/images/g12.png'


export default function Custom404() {
    return <Image src={error404} alt="404 Not fount"/>
}