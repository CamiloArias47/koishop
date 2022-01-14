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