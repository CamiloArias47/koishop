import { useEffect, useState } from "react"
import { useUI } from "components/UIcontext"
import { useCommerce, useSaveCart } from "components/CommerceContext"
import { useBuyForm, useDeliveryActions } from "components/BuyformContext"
import { updateCodeUsedBy } from "firebaseApi/firestoreDB/bill"

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

const TRANSACTION_STATUS = {
    ok : 'APPROVED',
    fail: 'DECLINED'
}

export default function PagarPage(){

    const [ checkoutStep, setCheckoutStep ] = useState(CHECKOUT_STEP.revision)
    const [ mostStep, setMostStep ] = useState(CHECKOUT_STEP.revision)
    
    const { reference, 
            cedula, 
            phone,
            city, 
            address,
            department } = useBuyForm()
    
    const { validateAndSave } = useDeliveryActions()

    const { closeSidebar, 
            userName,
            uid,
            email,
            openModal,
            closeModal } = useUI() 

    const { subtotalToPay, discountCode } = useCommerce()
    const { saveCart } = useSaveCart()

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
            reference: reference,
            //publicKey: 'pub_prod_bOQshOzmaqsaYQ8tzsHPUP7G3K2A1EqN',
            publicKey: 'pub_test_XdVuxWTudRKlUmJf5zwVO71K2I3pQRsO', 
            redirectUrl: 'https://koishop.vercel.app/success', // Opcional
            taxInCents: { // Opcional
              vat: 1900,
              consumption: 800
            },
            customerData: { // Opcional
              email,
              fullName: userName,
              phoneNumber: phone,
              phoneNumberPrefix: '+57',
              legalId: cedula,
              legalIdType: 'CC'
            },
            shippingAddress: { // Opcional
              addressLine1: address,
              city: city,
              phoneNumber: phone,
              region: department,
              country: "CO"
            }
          })

        checkout.open(function ( result ) {
            var transaction = result.transaction
            if(transaction.status === TRANSACTION_STATUS.ok){
                handlerPayApproved()
            }
          })
    }

    const handlerPayApproved = () => {
        if(discountCode !== ''){
            updateCodeUsedBy({bid:reference,uid,code:discountCode})
                .then(result => {
                    console.log({result})
                })
                .catch(err => {
                    console.log('something when wrong:',err)
                })
        }
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

            if(checkoutStep === CHECKOUT_STEP.pago){
                showWompyModal()
            }

            window.scrollTo(0,0)
        }
    }

    const moveFromTabs = (userWantGoTo) => {
        let moveTo = checkoutStep

        if(moveTo === userWantGoTo) return false

        if(mostStep === CHECKOUT_STEP.revision) return false

        if(mostStep === CHECKOUT_STEP.envio){
            moveTo = userWantGoTo <= CHECKOUT_STEP.envio ? userWantGoTo : checkoutStep
        } 

        if(mostStep === CHECKOUT_STEP.pago) moveTo = userWantGoTo

        //si estoy en revisión y me muevo a otro lado, actualizar carrito en base de datos 
        if(checkoutStep === CHECKOUT_STEP.revision){
            saveCart(uid).then( resp => {
                console.log({saveFromTabs: resp})
                setCheckoutStep(moveTo)
            })
        }
        //si estoy en envio y me muevo a otro lado guardar los datos en la base de datos
        else if(checkoutStep === CHECKOUT_STEP.envio){
            validateAndSave().then( resp => {
                console.log({valiateAndSave_fromTab: resp})
                setCheckoutStep(moveTo)
            })
        }
        else{
            setCheckoutStep(moveTo)
        }
    }

    let displayStep = <RevisionTab uid={uid} handlerNext={handlerBuyButton}/>

    if(checkoutStep === CHECKOUT_STEP.envio){
        displayStep = <EnvioTab handlerNext={handlerBuyButton}/>
    }
    else if(checkoutStep === CHECKOUT_STEP.pago){
        displayStep = <CheckoutTab handlerNext={handlerBuyButton} uid={uid} />
    }

    return(
        <div className="wraper">
            <NextSeo title={'Realizar pago | '+config.title} />
            <Script
                src="https://checkout.wompi.co/widget.js"
                strategy="beforeInteractive"
            />

            <ListProcess current={checkoutStep} move={moveFromTabs}/>
             { displayStep }
            <style jsx>{style}</style>
        </div>
    )
}