
import { ProductProps } from "../@types/product";
import { StockProps } from "../@types/stock";
import api from "./api";


export async function getStock() {

    const response = await api.get(`/stock`);
    return response.data as StockProps[];

}


export function groupStockByProductType(arrProductStock: StockProps[]) {
    let arrayStockGrouped: StockProps[][] = [];

    let productsTypes: string[] = [];
    arrProductStock.forEach(product => {
        if (!productsTypes.includes(product.type_product)) {
            productsTypes.push(product.type_product);
        }
    });
    for (var i = 0; i < productsTypes.length; i++) {
        let arr = arrProductStock.filter(product => product.type_product === productsTypes[i]);
        arrayStockGrouped.push(arr);

        if (i > 50) {//watch dog
            break;
        }
    }
    return arrayStockGrouped;
}
export async function addStock(mapIdCount: Map<number, number>) {

}
export async function updateStock(newStock: Map<number, number>) {
    let strArrayQuantities = JSON.stringify(Array.from(newStock))

    await new Promise((resolve, reject) => {
        api.post(`/stock/update`, {
            newQuantities: strArrayQuantities,//array em forma de string, passando as novas quantidades do estoque
        }).then(res => {
            if (res.data.success) {
                resolve("Estoque atualizado com sucesso!");
            }
            else {
                reject('Ocorreu algum erro!')
            }
        }).catch(err => reject(err.message))
    })

}
export async function discountStockOfSaleItems() {

    await new Promise((resolve, reject) => {
        api.post(`/stock/discount`)
            .then(res => {
                if (res.data.success) {
                    resolve(res.data.msg)
                }
                else {
                    reject(res.data.msg)
                }
            })
            .catch(reject)
    })
}