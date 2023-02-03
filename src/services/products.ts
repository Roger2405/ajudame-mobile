
import { ProductProps } from "../@types/product";
import api from "./api";
import getUserID from "./getUserID";


export async function getProducts() {
    const ID_USER = await getUserID();
    // const url = `${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`;
    const response = await api.get(`/${ID_USER}/products`);
    return response.data as ProductProps[];
}

// export async function getGroupedProducts() {
//     const products = await getProducts();

//     const groupedProducts = groupProducts(products);
//     return groupedProducts;
// }
export function getProductTypes(arrProducts: ProductProps[]) {
    let productsTypes: string[] = [];
    arrProducts.forEach(product => {
        if (!productsTypes.includes(product.type_product)) {
            productsTypes.push(product.type_product);
        }
    });

    return productsTypes;
}

// function groupProducts(arrProducts: ProductProps[]) {
//     let arrayProductsGrouped: ProductProps[][] = [];


//     for (var i = 0; i < productsTypes.length; i++) {
//         let arr = arrProducts.filter(product => product.type_product === productsTypes[i]);
//         arrayProductsGrouped.push(arr);

//         if (i > 50) {//watch dog
//             break;
//         }
//     }
//     return arrayProductsGrouped;
// }