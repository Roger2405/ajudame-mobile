
export type HistoricDetailsItemProps = {
    total: number
    cost: number
    gain: number
    day: string

}
export type PriceModels = 'main_price' | 'secondary_price'

export type SaleOverviewProps = {
    total: number
    cost: number
    gain: number
    ym_date: string
}
export type DetailedSaleProps = {
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
    is_main_price: boolean,
    name_product: string,
    cost_product?: number,
    price_product: number,
    type_product: string,
}