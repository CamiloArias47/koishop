import { firestore } from "firebaseApi/admin"
import { createProductPath } from 'utils'

export const getFirstTwentyProductsPaths = async () => {
    let paths = []

    const productsRef = firestore.collection('products');
    const firstTwenty = await productsRef.orderBy('name').limit(20).get();

    if (firstTwenty.empty) {
        return paths
    }

    firstTwenty.forEach(doc => {
        let path = createProductPath( doc.data().name )

        paths.push( { params: { product_name: path } } )
    });

    return paths
}



export const getFirstProductsOfCategory = async ({category, isSub = false}) => {
    let productsResponse = []

    const queryBy = isSub ? 'subcategory' : 'category'

    const productsRef = firestore.collection('products');
    const products = await productsRef
                                .where(queryBy,'==',category)
                                .orderBy('timestamp', 'desc')
                                .limit(21)
                                .get();

    products.forEach(doc => {
        productsResponse.push( { ...doc.data(), id : doc.id } )
    });

    return productsResponse
}