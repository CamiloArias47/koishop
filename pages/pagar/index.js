import { useUI } from "components/UIcontext"
import { useEffect } from "react"
import { NextSeo } from 'next-seo'
import { config } from 'components/commons/Head'

import ListProcess from 'components/commons/ListProccess'

import style from 'styles/style-pago'

export default function PagarPage(){

    const { closeSidebar } = useUI() 

    useEffect( () => {
        closeSidebar()
    },[])

    return(
        <div className="wraper">
            <NextSeo title={'Realizar pago | '+config.title} />
            <ListProcess/>

            <style jsx>{style}</style>
        </div>
    )
}