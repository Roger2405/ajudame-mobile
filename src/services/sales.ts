import { AxiosPromise } from "axios";
import { OrderProductProps, SaleProductProps } from "../@types/orderProduct";
import { SalesResumeProps } from "../@types/sales";
import api from "./api";
import getUserID from "./getUserID";

export async function getRecentSales() {
    const ID_USER = await getUserID();
    const today = new Date();
    const day = today.getDate();
    const formatedDay = day.toString().padStart(2, '0');
    const month = today.getMonth();
    const formatedMonth = (month + 1).toString().padStart(2, '0');
    const fullYear = today.getFullYear();

    const formatedDate = `${fullYear}-${formatedMonth}-${formatedDay}`;
    console.log(formatedDate)
    const response = await api.get(`/${ID_USER}/sales/${formatedDate}`)
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
export async function updateSalesOnDB(orderProducts: OrderProductProps[]) {
    const ID_USER = await getUserID();
    const strOrderProducts = JSON.stringify(Array.from(orderProducts));
    // const response = await api.post(`${ID_USER}/sales/register`, {
    //     orderProducts: strOrderProducts
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            api.post(`${ID_USER}/sales/register`, {
                orderProducts: strOrderProducts

            })
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err)
                })
        }, 2000)
    })
};

export async function getLastSale() {
    const ID_USER = await getUserID();
    const response = await api.get(`/${ID_USER}/sales/last`)
    const lastSale: SaleProductProps[] = response.data;

    return lastSale;
}

export async function deleteSale(dateTimeSale: string) {
    const ID_USER = await getUserID();

    const response = await api.delete(`/${ID_USER}/sales/delete/${dateTimeSale}`)
    return response.data;
}