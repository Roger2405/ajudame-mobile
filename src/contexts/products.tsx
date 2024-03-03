
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { getProducts, getProductTypes } from "../services/products";
import getGroupedArray from "../utils/groupArray";

interface ProductsContextData {
    productsGroupedByType: {},
    productTypes: string[],
    updateProductsInContext: () => void,
    topProducts: ProductProps[],
    isLoading: boolean
}
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);
interface Props {
    children: ReactNode
}
export function ProductsProvider({ children }: Props) {
    const [productsGroupedByType, setProductsGroupedByType] = useState<{ [type: string]: [] }>({})
    const [productTypes, setProductTypes] = useState<string[]>([]);
    const [topProducts, setTopProducts] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        updateProductsInContext();
    }, [])


    async function updateProductsInContext() {
        !isLoading && setIsLoading(true)
        getProducts()
            .then(res => {
                let products = res["products"];
                let topProducts = res["topProducts"];
                const productTypes = getProductTypes(products)
                const productsGrouped = getGroupedArray(products, productTypes);
                setProductTypes(productTypes)
                setProductsGroupedByType(productsGrouped);
                setTopProducts(topProducts)
            })
            .catch(console.log)
            .finally(() => setIsLoading(false));
    }
    return (
        <ProductsContext.Provider value={{ isLoading, productTypes, productsGroupedByType, topProducts, updateProductsInContext }}>
            {children}
        </ProductsContext.Provider>
    )
}
export function useProducts() {
    const context = useContext(ProductsContext);
    return context;
}