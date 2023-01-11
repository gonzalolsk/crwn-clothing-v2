import { createContext, useEffect, useState } from "react";

import { addCollectionAndDocuments} from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.js'


export const ProductsContext = createContext({
    products: [],
    // setCurrentProduct: () => {},
})

export const ProductsProvider = ({ children }) => {
    const [ products, setProducts] = useState([]);
    //Run this Only one Time To create the collection on firestore
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // },[])
    const value = { products }

    return <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
}