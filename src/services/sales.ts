
import { LastSaleProductProps, OrderProductProps, SaleProductProps } from "../@types/orderProduct";
import { SaleOverviewProps, SalesResumeProps } from "../@types/sales";
import api from "./api";
import getUserID from "./getUserID";

export async function getRecentSales() {
    const ID_USER = await getUserID();

    const response = await api.get(`/${ID_USER}/sales/recent`)
    const salesOfDay: SaleProductProps[] = response.data;

    return salesOfDay;
}
export async function getSalesByDate(date: string) {
    const ID_USER = await getUserID();

    console.log("Date", date)
    const response = await api.get(`/${ID_USER}/sales/${date}`)
    const sales: SaleProductProps[] = response.data;
    return sales;
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
export async function addSale(orderProducts: OrderProductProps[], priceModel: 'main' | 'secondary') {
    const ID_USER = await getUserID();

    const strOrderProducts = JSON.stringify(Array.from(orderProducts));

    return new Promise((resolve, reject) => {
        api.post(`${ID_USER}/sales/last`, {
            orderProducts: strOrderProducts,
            is_main_price: priceModel === 'main'
        })
            .then(res => {
                if (res.data.success)
                    resolve(res.data.msg);
                else {
                    reject(res.data.msg)
                }
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
};

export async function getLastSale() {
    const ID_USER = await getUserID();
    const response = await api.get(`/${ID_USER}/sales/last`)
    const lastSale: LastSaleProductProps = response.data;

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

export async function getHistoric() {
    const ID_USER = await getUserID();

    return new Promise((resolve, reject) => {
        api.get(`/${ID_USER}/sales/historic`)
            .then(res => {
                console.log(res.data)
                if (res.data[0]) {
                    resolve(res.data as SaleOverviewProps[]);
                }
                else {
                    reject('Sem dados recebidos do servidor!')
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
export async function getOverview(date: string) {
    const ID_USER = await getUserID();

    return new Promise((resolve, reject) => {
        api.get(`/${ID_USER}/sales/overview/${date}`)
            .then(res => {
                if (res.data[0])
                    resolve(res.data[0] as SaleOverviewProps);
                else {
                    reject('Sem dados recebidos do servidor!')
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}