import { useUI } from "components/UIcontext"
import { useCommerce } from "components/CommerceContext"

import { useEffect, useState } from "react"
import { NextSeo } from 'next-seo'
import { config } from 'components/commons/Head'

import ListProcess from 'components/commons/ListProccess'
import RevisionTab from "components/commons/CheckoutTabs/RevisionTab"
import EnvioTab from 'components/commons/CheckoutTabs/Envio'
import CheckoutTab from 'components/commons/CheckoutTabs/CheckoutTab'

import style from 'styles/style-pago'

export const CHECKOUT_STEP = {
    revision : 1,
    envio : 2,
    pago: 3 
}

export default function PagarPage(){

    const [ checkoutStep, setCheckoutStep ] = useState(CHECKOUT_STEP.revision)
    const [ mostStep, setMostStep ] = useState(CHECKOUT_STEP.revision)

    const { closeSidebar, 
            userName,
            openModal,
            closeModal } = useUI() 
    const { cart } = useCommerce()

    useEffect( () => {
        closeSidebar()
    },[])
    
    useEffect( () => {
        if(userName === '') openModal()
        else closeModal()
    },[userName])

    const handlerBuyButton = ()=>{
        if(userName === ''){
            openModal()
        }
        else{
            setCheckoutStep( prev => {
               return prev === CHECKOUT_STEP.pago 
                                ? CHECKOUT_STEP.pago  
                                : prev+1
            })
    
            setMostStep( prev => {
                return prev === CHECKOUT_STEP.pago
                                ? CHECKOUT_STEP.pago  
                                : checkoutStep < prev ? prev : prev+1
            })
            window.scrollTo(0,0)
        }
    }

    const moveFromTabs = (clicked) => {
        let moveTo = checkoutStep

        if(mostStep === CHECKOUT_STEP.revision) moveTo = CHECKOUT_STEP.revision
        if(mostStep === CHECKOUT_STEP.envio) moveTo = clicked <= CHECKOUT_STEP.envio ? clicked : checkoutStep
        if(mostStep === CHECKOUT_STEP.pago) moveTo = clicked

        setCheckoutStep(moveTo)
    }

    let displayStep = <RevisionTab/>

    if(checkoutStep === CHECKOUT_STEP.envio){
        displayStep = <EnvioTab />
    }
    else if(checkoutStep === CHECKOUT_STEP.pago){
        displayStep = <CheckoutTab />
    }

    const butonNext = cart.length === 0 
                        ? ''
                        : <button 
                            className="btn btn-primary btn-buy"
                            onClick={handlerBuyButton}  >
                                Hacer Compra 
                          </button>

    return(
        <div className="wraper">
            <NextSeo title={'Realizar pago | '+config.title} />
            <ListProcess current={checkoutStep} move={moveFromTabs}/>
            
            { displayStep }

            <div className="container-btn-buy">
                { butonNext }
            </div>

            <style jsx>{style}</style>
        </div>
    )
}