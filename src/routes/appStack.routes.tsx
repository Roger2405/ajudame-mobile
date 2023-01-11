
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AddProduct } from "../screens/AddProduct";
import { AddSales } from "../screens/AddSales";
import { Summary } from "../screens/Summary";
import { TabRoutes } from "./appTab.routes";


export function AppRoutes() {
    const { Screen, Navigator } = createNativeStackNavigator();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='Root'
                component={TabRoutes}
            />
            <Screen
                name='AddSales'
                component={AddSales}
            />
            <Screen
                name='Summary'
                component={Summary}
            />
            <Screen
                name='AddProduct'
                component={AddProduct}
            />

        </Navigator>
    )
}

