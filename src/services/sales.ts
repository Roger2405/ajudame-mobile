import { OrderProductProps } from "../@types/orderProduct";
import { SalesResumeProps } from "../@types/sales";
import api from "./api";
import getUserID from "./getUserID";

export async function getSalesByDay() {
    const ID_USER = await getUserID();
    const today = new Date();
    const formatedDate = today.toISOString().split('T')[0]

    const response = await api.get(`/${ID_USER}/sales/${formatedDate}`)
    const salesOfDay: OrderProductProps[] = response.data;

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