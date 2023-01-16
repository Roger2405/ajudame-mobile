
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SaleProductProps } from "../@types/orderProduct";
import { getLastSale, getRecentSales } from "../services/sales";

interface RecentSalesContextData {
    sales: SaleProductProps[] | null,
    lastSale: SaleProductProps[] | null,
    updateRecentSalesInContext: () => void,
}
const ProductsContext = createContext<RecentSalesContextData>({} as RecentSalesContextData);
interface Props {
    children: ReactNode
}
export function RecentSalesProvider({ children }: Props) {
    const [sales, setSales] = useState<SaleProductProps[] | null>(null)
    const [lastSale, setLastSale] = useState<SaleProductProps[] | null>(null)

    useEffect(() => {
        updateRecentSalesInContext();
    }, [])

    async function updateRecentSalesInContext() {
        getRecentSales().then(setSales).catch(console.log),
            getLastSale().then(setLastSale).catch(console.log)
    }
    return (
        <ProductsContext.Provider value={{ sales, lastSale, updateRecentSalesInContext }}>
            {children}
        </ProductsContext.Provider>
    )
}
export function useRecentSales() {
    const context = useContext(ProductsContext);
    return context;
}