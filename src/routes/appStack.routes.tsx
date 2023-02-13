
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ProductForm from "../screens/ProductForm";
import { NewSale } from "../screens/AddSale/NewSale";
import { Summary } from "../screens/AddSale/Summary";
import { TabRoutes } from "./appTab.routes";


export function AppRoutes() {
    const { Screen, Navigator } = createNativeStackNavigator();
    const colorScheme = useColorScheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,

                headerStyle: { backgroundColor: Colors.primary },
                // contentStyle: { paddingTop: 80 },
                // headerRight: () => <Button title="teste" />,
                headerBlurEffect: "dark",
                // headerTitleStyle: { color: Colors[colorScheme].textContrast },
                statusBarTranslucent: false,
                statusBarColor: Colors.primary,
                headerTintColor: Colors[colorScheme].textContrast,
                // contentStyle: { backgroundColor: Colors.primary }
                // contentStyle: { paddingTop: 48 }

            }}

        >
            <Screen
                name='Root'
                component={TabRoutes}
                options={{
                    headerShown: false,
                    // contentStyle: { paddingTop: 0 }
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
                name='ProductForm'
                // @ts-ignore
                component={ProductForm}
            />

        </Navigator>
    )
}
