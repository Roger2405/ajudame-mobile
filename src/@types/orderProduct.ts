export type OrderProductProps = {
    id_product: number
    price_product: number
    name_product: string
    count: number
}

export type SaleProductProps = {
    count: number,
    id: number,
    time: string,
    date_sale: string,
    name_product: string,
    price_product: number,
    type_product: string,
}