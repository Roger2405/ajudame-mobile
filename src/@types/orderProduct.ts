export type OrderProductProps = {
    id_product: number
    price_product: number
    name_product: string
    cost_product?: number
    count: number
}

export type LastSaleProductProps = {
    header: {
        id_sale: number,
        time: string,
        subtotal: number,
        discounted_stock: boolean
    }
    products: SaleProductProps[]
}

export type SaleProductProps = {
    count: number,
    id: number,
    name_product: string,
    price_product: number,
    type_product: string,
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