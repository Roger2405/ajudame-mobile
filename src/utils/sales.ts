import { PriceModels, SaleProductProps } from "../@types/sales";
import { useProducts } from "../contexts/products";
import getGroupedArray from "./groupArray";

export function getPieChartData(groupedSales: SaleProductProps[][]) {
    var newData: {
        label: string;
        type: string;
        sum: number;
    }[] = [];

    for (let i = 0; i < Object.keys( groupedSales ).length; i++) {
        const group = Object.keys( groupedSales )[i];
        const type_products = group;
        const typeWrapped = type_products.split(' ');
        const label = typeWrapped.join('\n');

        // let groupFilteredByPriceModel = group.filter(item => (priceModel == 'main' ? item.is_main_price : priceModel == 'secondary' ? !item.is_main_price : true))

        let sum = 0;
        groupedSales[group as any].forEach(sale => {
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