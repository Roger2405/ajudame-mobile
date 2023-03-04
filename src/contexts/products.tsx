
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { getProducts, getProductTypes } from "../services/products";
import getGroupedArray from "../utils/groupArray";

interface ProductsContextData {
    productsGroupedByType: ProductProps[][],
    productTypes: string[],
    updateProductsInContext: () => void,
    isLoading: boolean
}
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);
interface Props {
    children: ReactNode
}
export function ProductsProvider({ children }: Props) {
    const [productsGroupedByType, setProductsGroupedByType] = useState<ProductProps[][]>([])
    const [productTypes, setProductTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        updateProductsInContext();
    }, [])
    
    
    async function updateProductsInContext() {
        setIsLoading(true)
        getProducts()
            .then(products => {
                const productTypes = getProductTypes(products)
                const productsGrouped = getGroupedArray(products, productTypes);
                setProductTypes(productTypes)
                setProductsGroupedByType(productsGrouped);
            })
            .catch(console.log)
            .finally(() => setIsLoading(false))
    }
    return (
        <ProductsContext.Provider value={{ isLoading, productTypes, productsGroupedByType, updateProductsInContext }}>
            {children}
        </ProductsContext.Provider>
    )
}
export function useProducts() {
    const context = useContext(ProductsContext);
    return context;
}