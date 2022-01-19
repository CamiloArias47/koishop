import { 
    collection, 
    query, 
    orderBy, 
    startAt,
    where,
    startAfter, 
    endBefore,
    endAt,
    limit, 
    getDocs } from "firebase/firestore";

import db from './db'

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
                        limit(2) //21 prod
                        )
                :
                    query(productsRef,
                        where(queryBy,'==',search ) ,
                        orderBy('timestamp', 'desc'), 
                        startAfter(startPageAt),
                        limit(2) //21 prod
                        )
    }
    else{
        q = query(productsRef,
            where(queryBy,'==',search ) ,
            orderBy('timestamp', 'desc'), 
            startAfter(startPageAt),
            limit(2) //21 prod
            );
    }

    const first = await getDocs(q);

    first.forEach((doc) => {
        products.push( { id : doc.id, ...doc.data() } ) 
    });

    const lastVisible = first.docs[first.docs.length-1];

    return {products, lastVisible}
}



// // Query the first page of docs
// const first = query(collection(db, "cities"), orderBy("population"), limit(25));
// const documentSnapshots = await getDocs(first);

// // Get the last visible document
// const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
// console.log("last", lastVisible);

// // Construct a new query starting at this document,
// // get the next 25 cities.
// const next = query(collection(db, "cities"),
//     orderBy("population"),
//     startAfter(lastVisible),
//     limit(25));
