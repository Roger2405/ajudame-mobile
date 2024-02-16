
import { ProductDetailsProps, ProductProps } from "../@types/product";
import api from "./api";


export async function getProducts() {
    const response = await api.get(`/products`);
    return response.data as ProductProps[];
}

export function getProductTypes(arrProducts: ProductProps[]) {
    let productsTypes: string[] = [];
    arrProducts.forEach(product => {
        if (!productsTypes.includes(product.type_product)) {
            productsTypes.push(product.type_product);
        }
    });

    return productsTypes;
}
export async function addProduct(data: {}) {

    const response = await api.post(`/products/register`, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}

export async function getProduct(id_product: number) {


    const response = await api.get(`/products/${id_product}`)
    return response.data[0] as ProductDetailsProps;
}

export async function deleteProduct(id_product: number) {

    const response = await api.delete(`/products/${id_product}`)
    return response;
}
export async function updateProduct(data: {}, id: number) {

    const response = await api.put(`/products/${id}`, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}