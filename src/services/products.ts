
import { ProductProps } from "../@types/product";
import api from "./api";
import getUserID from "./getUserID";


export async function getProducts() {
    const ID_USER = await getUserID();
    // const url = `${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`;
    const response = await api.get(`/${ID_USER}/products`);
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
    const ID_USER = await getUserID();

    const response = await api.post(`/${ID_USER}/products/register`, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;

}
export async function getProduct(id_product: number) {
    const ID_USER = await getUserID();


    const response = await api.get(`/${ID_USER}/products/${id_product}`)
    console.log('response', response.data)
    return response.data[0] as ProductProps;
}

export async function deleteProduct(id_product: number) {
    const ID_USER = await getUserID();

    const response = await api.delete(`/${ID_USER}/products/${id_product}`)
    return response;
}   