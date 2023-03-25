
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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
    const [stockGroupedByType, setStockGroupedByType] = useState<StockProps[][] | null>(null)
    const [stock, setStock] = useState<StockProps[]>([]);
    const [stockMap, setStockMap] = useState(new Map<number, number>())

    useEffect(() => {
        updateStockInContext();
    }, [])
<<<<<<< HEAD

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
=======
>>>>>>> parent of dada9bd (improving performance in contexts)

    async function updateStockInContext() {
        getStock()
            .then(res => {
                setStock(res)
                let stockGrouped = groupStockByProductType(res);
                setStockGroupedByType(stockGrouped)
            })
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