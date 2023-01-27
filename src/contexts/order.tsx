
import { createContext, ReactNode, useContext, useState } from "react";
import { OrderProductProps } from "../@types/orderProduct";

interface OrderProductsContextData {
    orderProducts: OrderProductProps[],
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProductProps[]>>
}

const OrderProductsContext = createContext<OrderProductsContextData>({} as OrderProductsContextData);
interface Props {
    children: ReactNode
}
export function OrderProductsProvider({ children }: Props) {
    const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([])
    // const [isLoading, setIsLoading] = useState(false)

    return (
        <OrderProductsContext.Provider value={{ orderProducts, setOrderProducts }}>
            {children}
        </OrderProductsContext.Provider>
    )
}
export function useOrderProducts() {
    const context = useContext(OrderProductsContext);
    return context;
}