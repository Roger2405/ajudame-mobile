
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/auth";
import { ProductsProvider } from "../contexts/products";
import { RecentSalesProvider } from "../contexts/sales";
import { AppRoutes } from "./appStack.routes";
import { AuthRoutes } from "./authStack.routes";


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
                <AppRoutes />
            </RecentSalesProvider>
        </ProductsProvider>
        :
        <AuthRoutes />

}