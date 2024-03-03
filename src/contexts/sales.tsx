
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SaleProductProps, SaleOverviewProps, DetailedSaleProps } from "../@types/sales";
import { getLastSale, getOverview, getSalesByDate } from "../services/sales";
import { getCurrentDate } from "../utils/date";

interface RecentSalesContextData {
    sales: SaleProductProps[] | undefined,
    lastSale: DetailedSaleProps | undefined,
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
    const [lastSale, setLastSale] = useState<DetailedSaleProps | undefined>()
    const [sales, setSales] = useState<SaleProductProps[] | undefined>()
    const [isLoading, setIsLoading] = useState(true);
    const [date] = useState(getCurrentDate());

    useEffect(() => {
        updateSales()
    }, [])

    useEffect(() => {
        if (sales?.length) {
            getOverview(date)
                .then((res) => setOverviewData(res as SaleOverviewProps))
                .then(() => getLastSale())
                .then(setLastSale)
        }
    }, [sales])

    async function updateSales() {
        !isLoading && setIsLoading(true)
        
        getSalesByDate(date)
            .then(setSales)
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