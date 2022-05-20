import { firestore } from "firebaseApi/admin"

export const getCategoryPaths = async () => {
    let paths = []

    const categoryPaths = firestore.collection('categories');
    const categories = await categoryPaths.get();

    if (categories.empty) {
        return paths
    }

    categories.forEach(doc => {
        paths.push( { params: { slug: [doc.id] } } )
    });
    
    return paths
} 


export const getCategory = async (cid) => {
    const categoryRef = firestore.collection('categories').doc(cid)
    const doc = await categoryRef.get();
    
    if (!doc.exists) {
        return false
    } else {
        return {...doc.data()}
    }
}

export const getCategories = async () => {
    let allCategories = [] 
    const cateroriesRef = firestore.collection('categories');
    const categories = await cateroriesRef.get();

    if (categories.empty) {
        return allCategories
    }

    categories.forEach(doc => {
        allCategories.push({ id : doc.id, ...doc.data() })
    });

    return allCategories
}