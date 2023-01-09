import axios from "axios";
import { ProductProps } from "../@types/product";


export async function getProducts() {
    const response = await axios.get('https://server-ajudame.vercel.app/114/products');
    return response.data as ProductProps[];
}

export async function getGroupedProducts() {
    const products = await getProducts();

    const groupedProducts = groupProducts(products);
    return groupedProducts;
}


function groupProducts(arrProducts: ProductProps[]) {
    let arrayProductsGrouped: ProductProps[][] = [];
    let productsTypes: string[] = [];
    arrProducts.forEach(product => {
        if (!productsTypes.includes(product.type_product)) {
            productsTypes.push(product.type_product);
        }
    });
    for (var i = 0; i < productsTypes.length; i++) {
        let arr = arrProducts.filter(product => product.type_product === productsTypes[i]);
        arrayProductsGrouped.push(arr);

        if (i > 50) {//watch dog
            break;
        }
    }
    return arrayProductsGrouped;
}