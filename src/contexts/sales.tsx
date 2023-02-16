
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SaleProductProps, LastSaleProductProps, PriceModels, SaleOverviewProps } from "../@types/sales";
import { getLastSale, getOverview, getRecentSales, getSalesByDate } from "../services/sales";
import getGroupedArray from "../utils/groupArray";
import { useProducts } from "./products";

interface RecentSalesContextData {
    sales: SaleProductProps[] | null,
    lastSale: LastSaleProductProps | null,
    noCostItems: SaleProductProps[] | undefined
    overviewData: SaleOverviewProps
    updateSales: (date: string) => Promise<void>,
    isLoading: boolean
    dataPieChart: {
        label: string;
        type: string;
        sum: number;
    }[] | undefined
}
const RecentSalesContext = createContext<RecentSalesContextData>({} as RecentSalesContextData);
interface Props {
    children: ReactNode
}
export function SalesProvider({ children }: Props) {
    const [sales, setSales] = useState<SaleProductProps[] | null>(null)
    const [lastSale, setLastSale] = useState<LastSaleProductProps | null>(null)
    const [noCostItems, setNoCostItems] = useState<SaleProductProps[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [overviewData, setOverviewData] = useState<SaleOverviewProps>({} as SaleOverviewProps)
    const [priceModel, setPriceModel] = useState<PriceModels | undefined>();
    const [dataPieChart, setDataPieChart] = useState<{
        label: string;
        type: string,
        sum: number;
    }[]>();
    const { productTypes } = useProducts();

    useEffect(() => {
        console.log('atualizando pie chart')
        if (sales) {
            const groupedSales: SaleProductProps[][] = getGroupedArray(sales, productTypes)
            var newData = [] as typeof dataPieChart;

            for (let i = 0; i < groupedSales.length; i++) {
                const group = groupedSales[i];
                const type_products = group[0].type_product;
                const typeWrapped = type_products.split(' ');
                const label = typeWrapped.join('\n');

                let sum = 0;
                groupedSales[i].forEach(sale => {
                    sum += (sale.count * sale.price_product) - (sale.cost_product ?? 0 * sale.count);
                })
                newData?.push(
                    {
                        label,
                        type: type_products,
                        sum,
                    })
            }
            setDataPieChart(newData)
        }
        setNoCostItems(sales?.filter(sale => sale.cost_product == null))
    }, [sales])

    async function updateSales(date: string) {
        const currentISODate = new Date().toISOString().split('T')[0].toString();
        setIsLoading(true)
        if (date === undefined) date = currentISODate
        getOverview(date)
            .then((res) => setOverviewData(res as SaleOverviewProps))
        getSalesByDate(date)
            .then(setSales)
            .then(() => getLastSale())
            .then(setLastSale)
            .finally(() => setIsLoading(false))
    }
    return (
        <RecentSalesContext.Provider value={{ overviewData, dataPieChart, noCostItems, sales, lastSale, isLoading, updateSales }}>
            {children}
        </RecentSalesContext.Provider>
    )
}
export function useSales() {
    const context = useContext(RecentSalesContext);
    return context;
}