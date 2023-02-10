
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/auth";
import { OrderProductsProvider } from "../contexts/order";
import { ProductsProvider } from "../contexts/products";
import { RecentSalesProvider } from "../contexts/sales";
import { StockProvider } from "../contexts/stock";
import { AuthRoutes } from "./authStack.routes";
import { DrawerNav } from "./drawerNav.routes";


export function Routes() {

    const { signed, loading } = useAuth()

    if (loading) {
        <View>
            <ActivityIndicator />
        </View>
    }
    return signed ?
        <ProductsProvider>
            <RecentSalesProvider>
                <StockProvider>
                    <OrderProductsProvider>
                        <DrawerNav />

                    </OrderProductsProvider>
                </StockProvider>
            </RecentSalesProvider>
        </ProductsProvider>
        :
        <AuthRoutes />

}