const { getAuth } = require('firebase-admin/auth');

import { firestore } from "firebaseApi/admin"
import { firestore as admin } from 'firebase-admin'
import { ENVIROMENTS } from "utils"

export const saveTestingProduct = async () => {
    if( process.env.ENVIRONMENT === ENVIROMENTS.dev ){

        const batch = firestore.batch();

        const category = {
            photo:"https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/categories%2Fcat4.jpg?alt=media&token=57880966-95f0-4f65-86bc-46fe6f030ce9",
            subcategories:['subcategory1', 'subcategory2', 'subcategory3']
        }

        const testingProduct = {
            amount: 20,
            category: 'Test-Category',
            // colors: [
            //     '{"name":"Tono 1","color":"#F0CCC4","amount":1}'
            // ],
            description: "<h1>producto de prueba</h1> Lorem Ipsum</h3> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
            name: "Testing Product name",
            photo: "https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/products%2FTEST.jpg?alt=media&token=5a5288ba-75d2-4315-a427-61a425362cf6",
            //pictures: ["rutas.jpg", "rutas.png"],
            price: 2000,
            subcategory: 'subcategory1',
            timestamp: admin.FieldValue.serverTimestamp()
        }

        const testingProduct2 = {
            amount: 20,
            category: 'Test-Category',
            colors: [
                '{"name":"Tono 1","color":"#F0CCC4","amount":5}',
                '{"name":"Tono 2","color":"#CEBAB6","amount":5}',
                '{"name":"Tono 3","color":"#D2998E","amount":5}',
                '{"name":"Tono 4","color":"#F0CCC4","amount":0}'
            ],
            description: "<h1>producto de prueba</h1> Lorem Ipsum</h3> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
            name: "Testing Product Color",
            photo: "https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/products%2FTEST.jpg?alt=media&token=5a5288ba-75d2-4315-a427-61a425362cf6",
            //pictures: ["rutas.jpg", "rutas.png"],
            price: 2000,
            subcategory: 'subcategory1',
            timestamp: admin.FieldValue.serverTimestamp()
        }

        const categoryRef = firestore.collection('categories').doc('Test-Category')
        batch.set(categoryRef, category);

        const simpleProductref = firestore.collection('products').doc('testProduct1')
        batch.set(simpleProductref,testingProduct)

        const simpleProduct2ref = firestore.collection('products').doc('testProduct2')
        batch.set(simpleProduct2ref,testingProduct2)

        const res = await batch.commit();
        return res
    }
}

export const deleteTestingData = async () => {
    if(process.env.ENVIRONMENT === ENVIROMENTS.dev){
        const categoryRef = firestore.collection('categories').doc('Test-Category');
        const userRef = firestore.collection('users').doc('test-user-uid');
        const productsRef = firestore.collection('products').where('category', '==', 'Test-Category')
        const addressRef = firestore.collection('address').where('uid', '==', 'test-user-uid')
        const billRef = firestore.collection('bill').where('uid', '==', 'test-user-uid')


        try {
            await firestore.runTransaction(async (t) => {
                const products = await t.get(productsRef)
                const addreses = await t.get(addressRef)
                const bills = await t.get(billRef)

                if(products.size > 0){
                    for(let product of products.docs){
                        t.delete(product.ref)
                    }
                }

                if(addreses.size > 0){
                    for(let address of addreses.docs){
                        t.delete(address.ref)
                    }
                }

                if(bills.size > 0){
                    for(let bill of bills.docs){
                        t.delete(bill.ref)
                    }
                }

                t.delete(categoryRef)
                t.delete(userRef)
            });
            return {msg:"deleted testing data"}
            
        } catch (e) {
            console.log({e})
            return {msg:"deleted testing data fail", data:e}
        }

    }
}

//crea un usuario
export const createTestUser = () => {
     return getAuth()
            .createUser({
                uid: 'test-user-uid',
                email: 'testuser@copitto.com',
                emailVerified: false,
                phoneNumber: '+11234567890',
                password: 'secretPassword',
                displayName: 'John Doe',
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/koishop-dev.appspot.com/o/products%2FTEST.jpg?alt=media&token=5a5288ba-75d2-4315-a427-61a425362cf6',
                disabled: false,
            })
            .then( userRecord => userRecord.uid)   
}


export const deleteTestUser = () => {
    return getAuth()
            .deleteUser('test-user-uid')
            .then(() => ({msg:'user deleted'}) )
}

//guada el usuario en firestore
export const saveTestUser = async () => {
    const testingUser = {
        displayName: 'John Doe',
        email: "testuser@copitto.com",
        emailVerified: false,
        phoneNumber: null,
        photoURL: null
    }

    await firestore.collection('users').doc('test-user-uid').set(testingUser)
}