
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SaleProductProps, LastSaleProductProps } from "../@types/sales";
import { getLastSale, getRecentSales } from "../services/sales";

interface RecentSalesContextData {
    sales: SaleProductProps[] | null,
    lastSale: LastSaleProductProps | null,
    noCostItems: SaleProductProps[] | undefined
    updateRecentSalesInContext: () => void,
    isLoading: boolean
}
const RecentSalesContext = createContext<RecentSalesContextData>({} as RecentSalesContextData);
interface Props {
    children: ReactNode
}
export function RecentSalesProvider({ children }: Props) {
    const [sales, setSales] = useState<SaleProductProps[] | null>(null)
    const [lastSale, setLastSale] = useState<LastSaleProductProps | null>(null)
    const [noCostItems, setNoCostItems] = useState<SaleProductProps[]>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updateRecentSalesInContext()
    }, [])

    useEffect(() => {
        setNoCostItems(sales?.filter(sale => sale.cost_product == null))
    }, [sales])

    async function updateRecentSalesInContext() {
        setIsLoading(true)
        getRecentSales()
            .then(setSales)
            .then(() => getLastSale())
            .then(setLastSale)
            .finally(() => setIsLoading(false))
    }
    return (
        <RecentSalesContext.Provider value={{ noCostItems, sales, lastSale, isLoading, updateRecentSalesInContext }}>
            {children}
        </RecentSalesContext.Provider>
    )
}
export function useRecentSales() {
    const context = useContext(RecentSalesContext);
    return context;
}