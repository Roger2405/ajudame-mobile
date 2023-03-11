
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { StockProps } from "../@types/stock";
import { getStock, groupStockByProductType } from "../services/stock";

interface StockContextData {
    stockGroupedByType: StockProps[][] | null,
    stock: StockProps[],
    updateStockInContext: () => void,
    stockMap: Map<number, number>
}
const StockContext = createContext<StockContextData>({} as StockContextData);
interface Props {
    children: ReactNode
}
export function StockProvider({ children }: Props) {
    const [stock, setStock] = useState<StockProps[]>([]);
    const [stockMap, setStockMap] = useState(new Map<number, number>())

    const stockGroupedByType = useMemo(() => {
        return groupStockByProductType(stock)
    }, [stock])

    useLayoutEffect(() => {
        updateStockInContext();
    }, [])

    useEffect(() => {
        let map = new Map();
        stock.map((item) => {
            map.set(item.id_product, item.quantity);
        })
        setStockMap(map)
    }, [stock])

    async function updateStockInContext() {
        const stockResponse = await getStock();
        setStock(stockResponse);
    }

    return (
        <StockContext.Provider value={{ stockMap, stockGroupedByType, stock, updateStockInContext }}>
            {children}
        </StockContext.Provider>
    )
}
export function useStock() {
    const context = useContext(StockContext);
    return context;
}