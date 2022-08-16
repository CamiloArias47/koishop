import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useUI } from "components/UIcontext"
import { useCommerce, useSaveCart, TRANSACTION_STATUS, centsToPesos } from "components/CommerceContext"
import { useBuyForm, useDeliveryActions } from "components/BuyformContext"
import { updateStatus, addCashPaymentDetails } from "firebaseApi/firestoreDB/bill"
import { addPromoCodeUsedBy } from "firebaseApi/firestoreDB/promocode"
import { useCart } from "hooks/useCart"
import useLocalCategories from 'hooks/useLocalCategories'

import { NextSeo } from 'next-seo'
import { config } from 'components/commons/Head'
import Script from 'next/script'

import ListProcess from 'components/commons/ListProccess'
import RevisionTab from "components/commons/CheckoutTabs/RevisionTab"
import EnvioTab from 'components/commons/CheckoutTabs/Envio'
import CheckoutTab from 'components/commons/CheckoutTabs/CheckoutTab'

import { enviroment } from 'utils'
import style from 'styles/style-pago'

export const CHECKOUT_STEP = {
    revision : 1,
    envio : 2,
    pago: 3 
}

export default function PagarPage(){
    
    const router = useRouter()
    const {quitAllProducts} = useCart()
    const [ checkoutStep, setCheckoutStep ] = useState(CHECKOUT_STEP.revision)
    const [ mostStep, setMostStep ] = useState(CHECKOUT_STEP.revision)
    const env = enviroment()
    const dev = env === 'PRODUCTION' ? false : true
    
    const { reference,
            cedula, 
            phone,
            city, 
            address,
            department,
            setReference,
            setCode 
         } = useBuyForm()
    
    const { validateAndSave } = useDeliveryActions()

    const { closeSidebar, 
            userName,
            uid,
            email,
            openModal,
            closeModal,
            openDisplayBlockWindow,
            closeDisplayBlockWindow,
            openToast
         } = useUI() 

    const { subtotalToPay, discountCode } = useCommerce()
    const { saveCart } = useSaveCart()
    const { useGetLocalCategories } = useLocalCategories()

    useGetLocalCategories()

    useEffect( () => {
        closeSidebar()
    },[])
    
    useEffect( () => {
        if(userName === '') openModal()
        else closeModal()
    },[userName])

    const showWompyModal = () => {
        let configWompi = {
            currency: 'COP',
            amountInCents: subtotalToPay+'00',
            reference: reference,
            publicKey: dev ? 'pub_test_XdVuxWTudRKlUmJf5zwVO71K2I3pQRsO' : 'pub_prod_bOQshOzmaqsaYQ8tzsHPUP7G3K2A1EqN',
            redirectUrl: 'https://koimakeup.com/user/pedidos/success', // Opcional
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
          }
          
        let checkout = new WidgetCheckout(configWompi)

        checkout.open( result  => {
            let {status} = result.transaction
            openDisplayBlockWindow()

            if( status === TRANSACTION_STATUS.ok) handlerPayApproved(result)
            if( status === TRANSACTION_STATUS.pending) handlerPending(result)
            if( status === TRANSACTION_STATUS.fail ){
                updateStatus({bid:reference,status:TRANSACTION_STATUS.fail})
                    .then( () => {
                        closeDisplayBlockWindow()
                        openToast({title:'Transacción rechazada',msg:'por favor usa otro medio de pago'})
                    })
            }
          })
    }

    const handlerPayApproved = (result) => {
        const {amountInCents, status} = result.transaction

        const price = centsToPesos({amountInCents})

        let updatDataBill = {bid:reference, status, pricePayed:price}
        if(discountCode !== '') updatDataBill = {...updatDataBill, promocode:discountCode }
        
        updateStatus(updatDataBill)
        .then( () => handlerCleanCheckout() )
    }


    const handlerPending = (result) => {
        const {amountInCents, status, paymentMethod} = result.transaction
        const {businessAgreementCode, paymentIntentionIdentifier} = paymentMethod.extra

        const price = centsToPesos({amountInCents})

        const now = Date()

        let updateBillData = {
            bid:reference, 
            status, 
            pricePayed:price, 
            businessAgreementCode, 
            paymentIntentionIdentifier, 
            waitSince: now
        } 

        if(discountCode !== '') updateBillData = {...updateBillData, promocode:discountCode }

        addCashPaymentDetails(updateBillData)
        .then( () => {
            if(discountCode !== '') addPromoCodeUsedBy({bid:reference, uid, code:discountCode})
            return true
        })
        .then(() => handlerCleanCheckout() )
    }


    const handlerCleanCheckout = () => {
        let refBill = reference
        quitAllProducts()
        setReference(undefined)
        if(discountCode !== '') setCode('')
        router.push(`/user/pedidos/${refBill}`)
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

            if(checkoutStep === CHECKOUT_STEP.pago) showWompyModal()
        
            closeDisplayBlockWindow()
            window.scrollTo(0,0)
        }
    }

    const moveFromTabs = (userWantGoTo) => {
        let moveTo = checkoutStep

        if(moveTo === userWantGoTo) return false

        if(mostStep === CHECKOUT_STEP.revision) return false

        openDisplayBlockWindow()

        if(mostStep === CHECKOUT_STEP.envio){
            moveTo = userWantGoTo <= CHECKOUT_STEP.envio ? userWantGoTo : checkoutStep
        } 

        if(mostStep === CHECKOUT_STEP.pago) moveTo = userWantGoTo

        //si estoy en revisión y me muevo a otro lado, actualizar carrito en base de datos 
        if(checkoutStep === CHECKOUT_STEP.revision){
            saveCart(uid).then( () => setCheckoutStep(moveTo) )
            closeDisplayBlockWindow()
        }
        //si estoy en envio y me muevo a otro lado guardar los datos en la base de datos
        else if(checkoutStep === CHECKOUT_STEP.envio){
            validateAndSave().then( () => setCheckoutStep(moveTo) )
            closeDisplayBlockWindow()
        }
        else{
            setCheckoutStep(moveTo)
            closeDisplayBlockWindow()
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