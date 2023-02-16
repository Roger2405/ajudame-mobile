
export type HistoricDetailsItemProps = {
    total: number
    cost: number
    gain: number
    day: string

}
export type PriceModels = 'main' | 'secondary'

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
    is_main_price: boolean,
    name_product: string,
    cost_product?: number,
    price_product: number,
    type_product: string,
}