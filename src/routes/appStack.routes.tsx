
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ProductForm from "../screens/ProductForm";
import { NewSale } from "../screens/AddSale/NewSale";
import { Summary } from "../screens/AddSale/Summary";
import { TabRoutes } from "./appTab.routes";
import HistoricDetails from '../screens/HistoricDetails'
import { Account } from "../screens/Account";
import { DetailedSales } from "../screens/DetailedSales";


export function AppRoutes() {
    const { Screen, Navigator } = createNativeStackNavigator();
    const colorScheme = useColorScheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: Colors.primary },
                headerBlurEffect: "dark",
                headerTintColor: Colors[colorScheme].textContrast,

                statusBarTranslucent: false,
                statusBarColor: Colors.primary,
            }}

        >
            <Screen
                name='Root'
                component={TabRoutes}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="DetailedSales"
                component={DetailedSales}

            />
            <Screen
                name='NewSale'
                component={NewSale}
                options={{
                    title: 'Adicionar Venda'
                }}
            />
            <Screen
                name='Summary'
                component={Summary}
                options={{
                    title: 'Resumo da Venda'
                }}
            />
            <Screen
                name='ProductForm'
                // @ts-ignore
                component={ProductForm}
            />
            <Screen
                name='HistoricDetails'
                // @ts-ignore
                component={HistoricDetails}
            />
            <Screen
                name='Account'

                options={{ headerShown: true, contentStyle: { paddingTop: 56 }, title: "Conta" }}
                // @ts-ignore
                component={Account}
            />
        </Navigator>
    )
}
