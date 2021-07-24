import { DefaultSeo } from "next-seo"
import NextHead from "next/head"

const Head = ()=>{
    let config = {
            "title": "Koi Maquillaje",
            "description": "Koi tienda de maquillaje",
            "openGraph": {
              "title": "Koi Maquillaje",
              "description": "Koi tienda de maquillaje",
              "type": "website",
              "locale": "es",
              "url": "",
              "site_name": "Koi Maquillaje",
              "images": [
                {
                  "url": "/card.png",
                  "width": 800,
                  "height": 600,
                  "alt": "Koi"
                }
              ]
            }
    }

    return (
        <>
         <DefaultSeo {...config}/>
         <NextHead>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="manifest" href="/manifest.json" key="site-manifest" />
            <link rel="icon" href="/favicon.png" />
         </NextHead>
        </>
    )
}

export default Head