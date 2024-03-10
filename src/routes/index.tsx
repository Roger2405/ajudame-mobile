
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/auth";
import { OrderProductsProvider } from "../contexts/order";
import { ProductsProvider } from "../contexts/products";
import { SalesProvider } from "../contexts/sales";
import { StockProvider } from "../contexts/stock";
import api from "../services/api";
import { AuthRoutes } from "./authStack.routes";
import { DrawerNav } from "./drawerNav.routes";


export function Routes() {

    const { signed, loading, signOut } = useAuth();

    api.interceptors.response.use( ( response ) => {
        return response;
    }, ( error: any ) => {
        // Se deu erro 401, desloga o usuário, o token expirou
        if (error.response && error.response.status === 401) {
          signOut();
        }
    });

    if (loading) { 
        <View>
            <ActivityIndicator />
        </View>
    }
    
    return true ?
        <ProductsProvider>
            <SalesProvider>
                <StockProvider>
                    <OrderProductsProvider>
                        <DrawerNav />
                    </OrderProductsProvider>
                </StockProvider>
            </SalesProvider>
        </ProductsProvider>
        :
        <AuthRoutes />

}