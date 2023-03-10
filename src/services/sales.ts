
import { OrderProductProps } from "../@types/orderProduct";
import { DetailedSaleProps, HistoricDetailsItemProps, PriceModels, SaleOverviewProps, SaleProductProps } from "../@types/sales";
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
    console.log(date)
    const response = await api.get(`/${ID_USER}/sales/${date}`)
    const sales: SaleProductProps[] = response.data;
    return sales;
}

export async function addSale(orderProducts: OrderProductProps[], priceModel: PriceModels) {
    const ID_USER = await getUserID();

    const strOrderProducts = JSON.stringify(Array.from(orderProducts));

    return new Promise((resolve, reject) => {
        api.post(`${ID_USER}/sales/last`, {
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
    const ID_USER = await getUserID();
    const response = await api.get(`/${ID_USER}/sales/last`)
    const lastSale: DetailedSaleProps = response.data;
    return lastSale;
}
export async function getDetailedSalesOfDay(date: string) {
    const ID_USER = await getUserID();
    const response = await api.get(`/${ID_USER}/sales/${date}/details`)
    return response.data as DetailedSaleProps[];
}
export async function deleteSale(id_sale: number) {
    const ID_USER = await getUserID();

    return new Promise((resolve, reject) => {
        api.delete(`/${ID_USER}/sales/${id_sale}`)
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
export async function getHistoricDetails(yearMonth: string) {
    const ID_USER = await getUserID();

    return new Promise((resolve, reject) => {
        api.get(`/${ID_USER}/sales/historic/${yearMonth}`)
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