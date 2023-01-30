
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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
    const [stockGroupedByType, setStockGroupedByType] = useState<StockProps[][] | null>(null)
    const [stock, setStock] = useState<StockProps[]>([]);

    useEffect(() => {
        updateStockInContext();
    }, [])

    async function updateStockInContext() {
        getStock()
            .then(res => {
                setStock(res)
                let stockGrouped = groupStockByProductType(res);
                setStockGroupedByType(stockGrouped)
            })
        // getGroupedStockByProductType().then(setStockGroupedByType).catch(console.log)
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