import { useUI } from "components/UIcontext"
import { useCommerce } from "components/CommerceContext"
import { ManagedBuyFormContext } from "components/BuyformContext"

import { useEffect, useState } from "react"
import { NextSeo } from 'next-seo'
import { config } from 'components/commons/Head'
import Script from 'next/script'

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
            uid,
            email,
            openModal,
            closeModal } = useUI() 
    const { cart, subtotalToPay } = useCommerce()

    useEffect( () => {
        closeSidebar()
    },[])
    
    useEffect( () => {
        if(userName === '') openModal()
        else closeModal()
    },[userName])

    const showWompyModal = () => {
        var checkout = new WidgetCheckout({
            currency: 'COP',
            amountInCents: subtotalToPay+'00',
            reference: 'AD002901221',
            //publicKey: 'pub_prod_bOQshOzmaqsaYQ8tzsHPUP7G3K2A1EqN',
            publicKey: 'pub_test_XdVuxWTudRKlUmJf5zwVO71K2I3pQRsO', 
            //redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
            taxInCents: { // Opcional
              vat: 1900,
              consumption: 800
            },
            customerData: { // Opcional
              email,
              fullName: userName,
              phoneNumber: '3040777777',
              phoneNumberPrefix: '+57',
              legalId: '123456789',
              legalIdType: 'CC'
            },
            shippingAddress: { // Opcional
              addressLine1: "Calle 123 # 4-5",
              city: "Bogota",
              phoneNumber: '3019444444',
              region: "Cundinamarca",
              country: "CO"
            }
          })

        checkout.open(function ( result ) {
            var transaction = result.transaction
            console.log('Transaction ID: ', transaction.id)
            console.log('Transaction object: ', transaction)
          })
    }

    const validateFields  = () => {
        
    }


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

            if(checkoutStep === CHECKOUT_STEP.envio){
                validateFields()
            }

            if(checkoutStep === CHECKOUT_STEP.pago){
                showWompyModal()
            }

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

    let displayStep = <RevisionTab handlerNext={handlerBuyButton}/>

    if(checkoutStep === CHECKOUT_STEP.envio){
        displayStep = <EnvioTab handlerNext={handlerBuyButton}/>
    }
    else if(checkoutStep === CHECKOUT_STEP.pago){
        displayStep = <CheckoutTab handlerNext={handlerBuyButton}/>
    }

    return(
        <div className="wraper">
            <NextSeo title={'Realizar pago | '+config.title} />
            <Script
                src="https://checkout.wompi.co/widget.js"
                strategy="beforeInteractive"
            />
            <ListProcess current={checkoutStep} move={moveFromTabs}/>
            <ManagedBuyFormContext>
             { displayStep }
            </ManagedBuyFormContext>

            <style jsx>{style}</style>
        </div>
    )
}