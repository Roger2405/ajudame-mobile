
import { ProductProps } from "../@types/product";
import { StockProps } from "../@types/stock";
import api from "./api";
import getUserID from "./getUserID";


export async function getStock() {
    const ID_USER = await getUserID();

    const response = await api.get(`/${ID_USER}/stock`);
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

export async function updateQuantitiesOnDB(newStock: Map<number, number>) {

    let strArrayQuantities = JSON.stringify(Array.from(newStock))

    // setIsLoading(true);//inicia feedback de carregamento e desativa o botão de editar estoque até a atualizção do mesmo seja feita no BD
    const ID_USER = await getUserID();

    // const url = `${process.env.REACT_APP_LINK_API}/${ID_USER}/stock/update`;
    await new Promise((resolve, reject) => {
        api.post(`/${ID_USER}/stock/update`, {
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
