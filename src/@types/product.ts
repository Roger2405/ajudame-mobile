export type ProductProps = {
    id: number
    name_product: string
    type_product: string
    image_path?: string
    main_price: number
    secondary_price?: number
}

export type ProductDetailsProps = {
    id: number;
    name_product: string;
    image_path?: string
    type_product: string;
    main_price: number;
    secondary_price?: number;
    stock: number;
    editable_cost: number;
    cost?: number
}