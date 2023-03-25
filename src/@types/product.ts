export interface ProductProps {
    id_product: number
    name_product: string
    type_product: string
    image_path?: string
    main_price: number
    secondary_price?: number
}

export interface ProductDetailsProps extends ProductProps {
    stock: number;
    editable_cost: number;
    cost?: number
}