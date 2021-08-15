import Image from 'next/image'
import error404 from 'public/images/404b.svg'


export default function Custom404() {
    return <div className="page-404">
            <Image src={error404} alt="404 Not fount"/>

            <style>{
                `.page-404{
                    text-align:center;
                 }`
                }    
            </style>
           </div>
}