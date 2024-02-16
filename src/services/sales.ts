
import { OrderProductProps } from "../@types/orderProduct";
import { DetailedSaleProps, HistoricDetailsItemProps, PriceModels, SaleOverviewProps, SaleProductProps } from "../@types/sales";
import api from "./api";


export async function getSalesByDate(date: string) {
    const response = await api.get(`/sales/${date}`)
    const sales: SaleProductProps[] = response.data;
    return sales;
}

export async function addSale(orderProducts: OrderProductProps[], priceModel: PriceModels) {

    const strOrderProducts = JSON.stringify(Array.from(orderProducts));

    return new Promise((resolve, reject) => {
        api.post(`/sales/last`, {
            orderProducts: strOrderProducts,
            is_main_price: priceModel === 'main_price'
        })
            .then(res => {
                if (res.data.success)
                    resolve(res.data.msg);
                else {
                    reject(res.data.msg)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
};

export async function getLastSale() {
    const response = await api.get(`/sales/last`)
    const lastSale: DetailedSaleProps = response.data;
    return lastSale;
}
export async function getDetailedSalesOfDay(date: string) {
    const response = await api.get(`/sales/${date}/details`)
    return response.data as DetailedSaleProps[];
}
export async function deleteSale(id_sale: number) {

    return new Promise((resolve, reject) => {
        api.delete(`/sales/${id_sale}`)
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

    return new Promise((resolve, reject) => {
        api.get(`/sales/historic`)
            .then(res => {
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

    return new Promise((resolve, reject) => {
        api.get(`/sales/overview/${date}`)
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
export async function getHistoricDetails(yearMonth: string) {

    return new Promise((resolve, reject) => {
        api.get(`/sales/historic/${yearMonth}`)
            .then(res => {
                if (res.data[0])
                    resolve(res.data as HistoricDetailsItemProps[]);
                else {
                    reject('Sem dados recebidos do servidor!')
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}