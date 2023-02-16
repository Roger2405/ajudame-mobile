
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { SaleProductProps, LastSaleProductProps, PriceModels, SaleOverviewProps } from "../@types/sales";
import { getLastSale, getOverview, getSalesByDate } from "../services/sales";
import { getCurrentDate } from "../utils/date";
import getGroupedArray from "../utils/groupArray";
import { getPieChartData } from "../utils/sales";
import { useProducts } from "./products";

interface RecentSalesContextData {
    sales: SaleProductProps[] | undefined,
    lastSale: LastSaleProductProps | undefined,
    overviewData: SaleOverviewProps
    updateSales: () => Promise<void>,
    isLoading: boolean
}
const RecentSalesContext = createContext<RecentSalesContextData>({} as RecentSalesContextData);
interface Props {
    children: ReactNode
}
export function SalesProvider({ children }: Props) {
    const [overviewData, setOverviewData] = useState<SaleOverviewProps>({} as SaleOverviewProps)
    const [lastSale, setLastSale] = useState<LastSaleProductProps | undefined>()
    const [sales, setSales] = useState<SaleProductProps[] | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        updateSales()
    }, [])


    async function updateSales() {
        setIsLoading(true)
        const date = getCurrentDate()

        getSalesByDate(date)
            .then(setSales)
            .then(() => getOverview(date))
            .then((res) => setOverviewData(res as SaleOverviewProps))
            .then(() => getLastSale())
            .then(setLastSale)
            .catch(alert)
            .finally(() => setIsLoading(false))
    }
    return (
        <RecentSalesContext.Provider value={{ overviewData, sales, lastSale, isLoading, updateSales }}>
            {children}
        </RecentSalesContext.Provider>
    )
}
export function useSales() {
    const context = useContext(RecentSalesContext);
    return context;
}