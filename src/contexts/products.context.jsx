import { createContext, useEffect, useState } from "react";
import PRODUCTS_DATA from '../shop-data.json'


export const ProductsContext = createContext({
    products: [],
    // setCurrentProduct: () => {},
})

export const ProductsProvider = ({ children }) => {
    const [ products, setProducts] = useState(PRODUCTS_DATA);
    const value = { products }

    return <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
}