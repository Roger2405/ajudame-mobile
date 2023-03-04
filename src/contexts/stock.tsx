
import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { StockProps } from "../@types/stock";
import { getStock, groupStockByProductType } from "../services/stock";

interface StockContextData {
    stockGroupedByType: StockProps[][] | null,
    stock: StockProps[],
    updateStockInContext: () => void,
}
const StockContext = createContext<StockContextData>({} as StockContextData);
interface Props {
    children: ReactNode
}
export function StockProvider({ children }: Props) {
    const [stock, setStock] = useState<StockProps[]>([]);

    const stockGroupedByType = useMemo(() => {
        return groupStockByProductType(stock)
    }, [stock])

    useLayoutEffect(() => {
        updateStockInContext();
    }, [])
    async function updateStockInContext() {
        const stockResponse = await getStock();
        setStock(stockResponse);
    }

    return (
        <StockContext.Provider value={{ stockGroupedByType, stock, updateStockInContext }}>
            {children}
        </StockContext.Provider>
    )
}
export function useStock() {
    const context = useContext(StockContext);
    return context;
}