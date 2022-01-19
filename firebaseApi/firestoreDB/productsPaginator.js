import { 
    collection, 
    query, 
    orderBy, 
    where,
    startAfter, 
    limit, 
    getDocs } from "firebase/firestore";

import db from './db'

export const LIMIT = {
    category : 2
}


export async function getSecondPage({category, startPageAt, isSub = false, firstReq = false, getFromStart = false}){

    const products = []
    
    const queryBy = isSub ? 'subcategory' : 'category'
    const search = isSub ?? category

    const productsRef = collection(db, "products");

    let q 

    if(firstReq){
        startPageAt = new Date(startPageAt)
        q = getFromStart 
                ?
                    query(productsRef,
                        where(queryBy,'==',search ) ,
                        orderBy('timestamp', 'desc'),
                        limit( LIMIT.category ) 
                        )
                :
                    query(productsRef,
                        where(queryBy,'==',search ) ,
                        orderBy('timestamp', 'desc'), 
                        startAfter(startPageAt),
                        limit( LIMIT.category) 
                        )
    }
    else{
        q = query(productsRef,
            where(queryBy,'==',search ) ,
            orderBy('timestamp', 'desc'), 
            startAfter(startPageAt),
            limit( LIMIT.category ) 
            );
    }

    const first = await getDocs(q);

    first.forEach((doc) => {
        products.push( { id : doc.id, ...doc.data() } ) 
    });

    const lastVisible = first.docs[first.docs.length-1];

    return {products, lastVisible}
}

