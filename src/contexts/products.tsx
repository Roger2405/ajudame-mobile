
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { getProducts, getProductTypes } from "../services/products";
import getGroupedArray from "../utils/groupArray";

interface ProductsContextData {
    productsGroupedByType: ProductProps[][],
    productTypes: string[],
    updateProductsInContext: () => void,
}
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);
interface Props {
    children: ReactNode
}
export function ProductsProvider({ children }: Props) {
    const [productsGroupedByType, setProductsGroupedByType] = useState<ProductProps[][]>([])
    const [productTypes, setProductTypes] = useState<string[]>([]);
    useEffect(() => {
        updateProductsInContext();
    }, [])

    async function updateProductsInContext() {
        getProducts()
            .then(products => {
                const productTypes = getProductTypes(products)
                const productsGrouped = getGroupedArray(products, productTypes);
                setProductTypes(productTypes)
                setProductsGroupedByType(productsGrouped);
            })
            .catch(console.log)
    }
    return (
        <ProductsContext.Provider value={{ productTypes, productsGroupedByType, updateProductsInContext }}>
            {children}
        </ProductsContext.Provider>
    )
}
export function useProducts() {
    const context = useContext(ProductsContext);
    return context;
}