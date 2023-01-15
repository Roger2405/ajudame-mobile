
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProductProps } from "../@types/product";
import { getGroupedProducts } from "../services/products";

interface ProductsContextData {
    productsGroupedByType: ProductProps[][] | null,
    updateProductsInContext: () => void,
}
const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);
interface Props {
    children: ReactNode
}
export function ProductsProvider({ children }: Props) {
    const [productsGroupedByType, setProductsGroupedByType] = useState<ProductProps[][] | null>(null)

    useEffect(() => {
        updateProductsInContext();
    }, [])

    async function updateProductsInContext() {
        getGroupedProducts().then(setProductsGroupedByType).catch(console.log)
    }
    return (
        <ProductsContext.Provider value={{ productsGroupedByType, updateProductsInContext }}>
            {children}
        </ProductsContext.Provider>
    )
}
export function useProducts() {
    const context = useContext(ProductsContext);
    return context;
}