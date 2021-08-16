import Image from 'next/image'
import error404Phone from 'public/images/404.svg'
import error404Tablet from 'public/images/404t.svg'
import error404Desktop from 'public/images/404d.svg'

const SIZES = {
    mobile: error404Phone,
    tablet: error404Tablet,
    desktop: error404Desktop
}

export default function Custom404() {
    let _w = window !== undefined ? window.innerWidth : 1020

    let image = _w >= 1020 ? 'desktop' 
                           : (_w <= 760) 
                                ? 'mobile' 
                                : 'tablet'


    return <div className="page-404">
            <Image src={SIZES[image]} alt="404 Not fount" placeholde="blur"/>
            <style>{
                `.page-404{
                    text-align:center;
                 }`
                }    
            </style>
           </div>
}