
export type SaleOverviewProps = {
    total: number
    cost: number
    gain: number
    ym_date: string
}
export type LastSaleProductProps = {
    header: {
        id_sale: number,
        datetime: string,
        subtotal: number,
        is_main_price: boolean,
        discounted_stock: boolean
    }
    products: SaleProductProps[]
}

export type SaleProductProps = {
    count: number,
    id: number,
    name_product: string,
    cost_product?: number,
    price_product: number,
    type_product: string,
}