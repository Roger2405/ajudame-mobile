
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { AddProduct } from "../screens/AddProduct";
import { NewSale } from "../screens/AddSale/NewSale";
import { Summary } from "../screens/AddSale/Summary";
import { TabRoutes } from "./appTab.routes";


export function AppRoutes() {
    const { Screen, Navigator } = createNativeStackNavigator();
    const colorScheme = useColorScheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: Colors.primary },
                // headerRight: () => <Button title="teste" />,
                headerBlurEffect: "dark",
                // headerTitleStyle: { color: Colors[colorScheme].textContrast },
                statusBarTranslucent: true,
                headerTintColor: Colors[colorScheme].textContrast
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
                name='AddProduct'
                component={AddProduct}
            />

        </Navigator>
    )
}

