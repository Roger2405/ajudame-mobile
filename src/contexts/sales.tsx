
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SaleProductProps } from "../@types/orderProduct";
import { getLastSale, getRecentSales } from "../services/sales";

interface RecentSalesContextData {
    sales: SaleProductProps[] | null,
    lastSale: SaleProductProps[] | null,
    updateRecentSalesInContext: () => void,
    isLoading: boolean
}
const RecentSalesContext = createContext<RecentSalesContextData>({} as RecentSalesContextData);
interface Props {
    children: ReactNode
}
export function RecentSalesProvider({ children }: Props) {
    const [sales, setSales] = useState<SaleProductProps[] | null>(null)
    const [lastSale, setLastSale] = useState<SaleProductProps[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updateRecentSalesInContext()
    }, [])

    async function updateRecentSalesInContext() {
        setIsLoading(true)
        getRecentSales()
            .then(setSales)
            .then(() => getLastSale())
            .then(setLastSale)
            .finally(() => setIsLoading(false))
    }
    return (
        <RecentSalesContext.Provider value={{ sales, lastSale, isLoading, updateRecentSalesInContext }}>
            {children}
        </RecentSalesContext.Provider>
    )
}
export function useRecentSales() {
    const context = useContext(RecentSalesContext);
    return context;
}