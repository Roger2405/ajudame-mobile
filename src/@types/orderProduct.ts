import { ProductProps } from "./product"


export interface OrderProductProps extends ProductProps {
    // id_product: number
    // price_product: number
    // main_price: number,
    // secondary_price: number
    // name_product: string
    // cost_product?: number
    count: number
}

/*
    "id_sale": 102,
    "id_product": 5,
    "price_product": 7,
    "count": 1,
    "name_product": "Suco de Mimosa",
    "type_product": "outros",
    "time_sale": "17:59:24"
*/