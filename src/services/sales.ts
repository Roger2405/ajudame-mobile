
import { LastSaleProductProps, OrderProductProps, SaleProductProps } from "../@types/orderProduct";
import { SalesResumeProps } from "../@types/sales";
import api from "./api";
import getUserID from "./getUserID";

export async function getRecentSales() {
    const ID_USER = await getUserID();

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const fullYear = today.getFullYear();

    const formatedDay = day.toString().padStart(2, '0');
    const formatedMonth = (month + 1).toString().padStart(2, '0');

    const formatedDate = `${fullYear}-${formatedMonth}-${formatedDay}`;
    const response = await api.get(`/${ID_USER}/sales/recent`)
    const salesOfDay: SaleProductProps[] = response.data;

    return salesOfDay;
}

export async function getSalesResume() {
    const ID_USER = await getUserID();
    const salesResume: SalesResumeProps[] = await api.get(`/${ID_USER}/sales`)
        .then((response) => {
            if (response.data[0]) {
                return response.data;
            }
            else {
                throw Error(response.data.msg);
            }
        })
    return salesResume
}
export async function updateSalesOnDB(orderProducts: OrderProductProps[], discountStock: boolean) {
    const ID_USER = await getUserID();

    const strOrderProducts = JSON.stringify(Array.from(orderProducts));
    discountStock = true;

    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        console.log(strOrderProducts);
        api.post(`${ID_USER}/sales/last`, {
            orderProducts: strOrderProducts,
            discountStock
        })
            .then(res => {
                if (res.data.success)
                    resolve(res.data.msg);
                else {
                    reject(res.data.msg)
                }
            })
            .catch(err => {
                reject('Ocorreu um erro no servidor!')
            })
        // }, 2000)
    })
};

export async function getLastSale() {
    const ID_USER = await getUserID();
    const response = await api.get(`/${ID_USER}/sales/last`)
    const lastSale: LastSaleProductProps[] = response.data;

    return lastSale;
}

export async function deleteLastSale() {
    const ID_USER = await getUserID();

    return new Promise((resolve, reject) => {
        api.delete(`/${ID_USER}/sales/last/`)
            .then(res => {
                if (res.data.success) {
                    resolve(res.data.msg);
                }
                else {
                    reject(res.data.msg)
                }
            })
            .catch(err => {
                reject('Ocorreu um erro no servidor!')
            })
    })
}