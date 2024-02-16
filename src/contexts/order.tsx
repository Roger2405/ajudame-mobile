
import { useFocusEffect } from "@react-navigation/native";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { OrderProductProps } from "../@types/orderProduct";
import { ProductProps } from "../@types/product";
import { PriceModels } from "../@types/sales";

interface OrderProductsContextData {
    orderProducts: OrderProductProps[],
    addProductToOrder: (product: ProductProps) => void,
    addCountToOrderProduct: (orderProduct: OrderProductProps) => void,
    subProductOfOrder: (id: number) => void,
    priceModel: PriceModels,
    setPriceModel: React.Dispatch<React.SetStateAction<PriceModels>>
    clearOrderProducts: () => void,
    updateOrderProductQuantity: ( product: ProductProps, quantity: number ) => void,
    totalValue: number
}

const OrderProductsContext = createContext<OrderProductsContextData>({} as OrderProductsContextData);
interface Props {
    children: ReactNode
}
export function OrderProductsProvider({ children }: Props) {
    const [orderProducts, setOrderProducts] = useState<OrderProductProps[]>([])
    const [priceModel, setPriceModel] = useState<PriceModels>('main_price');
    const totalValue = useMemo(() => {
        let sum = 0;
        orderProducts.forEach(orderProduct => {
            sum += (priceModel == 'main_price' ? orderProduct.main_price : (orderProduct.secondary_price || 0)) * orderProduct.count;
        })
        return sum;
    }, [orderProducts, priceModel])

    // const [isLoading, setIsLoading] = useState(false)
    function clearOrderProducts() {
        setOrderProducts([])
    }


    function subProductOfOrder(id_product: number) {
        setOrderProducts(orderProducts => {
            const indexOfProduct = orderProducts.findIndex(item => item.id_product == id_product);
            const oldItem = orderProducts[indexOfProduct];

            oldItem.count--;
            if (oldItem.count <= 0) {
                orderProducts.splice(indexOfProduct, 1);
            }

            return [...orderProducts]
        })

    }
    function addCountToOrderProduct(orderProduct: OrderProductProps) {
        setOrderProducts(orderProducts => {
            const indexOfProduct = orderProducts.findIndex(item => item.id_product == orderProduct.id_product);

            if (indexOfProduct != -1) {//caso encontre um produto já existente no array
                orderProducts[indexOfProduct].count++;
            }
            return [...orderProducts]

        })
    }

    function updateOrderProductQuantity(product: ProductProps, quantity: number) {

        setOrderProducts(orderProducts => {
            const indexOfProduct = orderProducts.findIndex(item => item.id_product == product.id_product);

            if (indexOfProduct != -1) {//caso encontre um produto já existente no array
                orderProducts[indexOfProduct].count = quantity;
            } else {
                orderProducts[ Object.keys( orderProducts ).length ] = { ...product, count: quantity,  };
            }
            return [...orderProducts]

        })
    }

    function addProductToOrder(product: ProductProps) {
        setOrderProducts(orderProducts => {
            const indexOfProduct = orderProducts.findIndex(item => item.id_product === product.id_product);

            if (indexOfProduct != -1) {//caso encontre um produto já existente no array
                orderProducts[indexOfProduct].count++;
            }
            else {//caso contrário adiciona no final do array
                orderProducts.push({ ...product, count: 1 })
            }
            return [...orderProducts]
        })

    }

    return (
        <OrderProductsContext.Provider value={{ totalValue, priceModel, setPriceModel, addCountToOrderProduct, clearOrderProducts, subProductOfOrder, addProductToOrder, updateOrderProductQuantity, orderProducts }}>
            {children}
        </OrderProductsContext.Provider>
    )
}
export function useOrderProducts() {
    const context = useContext(OrderProductsContext);
    return context;
}