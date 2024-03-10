
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { TabRoutes } from "./appTab.routes";

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
            initialRouteName="Root"
        >
            <Screen
                name='Root'
                component={TabRoutes}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}
