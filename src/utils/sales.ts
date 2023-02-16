import { PriceModels, SaleProductProps } from "../@types/sales";
import { useProducts } from "../contexts/products";
import getGroupedArray from "./groupArray";

export function getPieChartData(groupedSales: SaleProductProps[][]) {
    var newData: {
        label: string;
        type: string;
        sum: number;
    }[] = [];

    for (let i = 0; i < groupedSales.length; i++) {
        const group = groupedSales[i];
        const type_products = group[0].type_product;
        const typeWrapped = type_products.split(' ');
        const label = typeWrapped.join('\n');

        // let groupFilteredByPriceModel = group.filter(item => (priceModel == 'main' ? item.is_main_price : priceModel == 'secondary' ? !item.is_main_price : true))

        let sum = 0;
        group.forEach(sale => {
            sum += (sale.count * sale.price_product) - (sale.cost_product ?? 0 * sale.count);
        })
        newData?.push(
            {
                label,
                type: type_products,
                sum,
            })
    }
    return newData;
}