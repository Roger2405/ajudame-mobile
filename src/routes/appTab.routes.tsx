import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { OptionsModal } from "../components/OptionsModal";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import Products from "../screens/Products";
import Stock from "../screens/Stock";



export function TabRoutes() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createBottomTabNavigator();

    const OPTIONS_ITEM_WIDTH = 32;

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                //cores
                tabBarActiveBackgroundColor: Colors[colorScheme].background,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors[colorScheme].textContrast,
                //estilos
                tabBarStyle: { top: 0, position: "absolute", paddingTop: 8, height: 64, paddingRight: OPTIONS_ITEM_WIDTH },
                tabBarItemStyle: { borderTopLeftRadius: 8, borderTopRightRadius: 8, flexGrow: 1 },
                tabBarLabelStyle: { fontSize: 12, textTransform: "uppercase", fontWeight: '700' },

                tabBarBadgeStyle: { backgroundColor: 'blue' },
            }}
            initialRouteName="home"
            // safeAreaInsets={{ right: 32, left: 0 }}
            sceneContainerStyle={{ paddingTop: 64 }}


        >
            <Screen
                name='options'
                component={OptionsModal}
                options={{
                    title: 'Opções',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="ellipsis-v" size={32} color={color} />,
                    tabBarItemStyle: { flexBasis: OPTIONS_ITEM_WIDTH, flexGrow: 0, flexShrink: 0 },
                    tabBarLabelStyle: { display: 'none' },

                }}


            />
            <Screen
                name='home'
                component={Home}
                options={{
                    title: 'Vendas',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dollar-sign" size={32} color={color} />,
                }}

            />
            <Screen
                name='products'
                component={Products}
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={32} color={color} />,
                }}
            />
            <Screen
                name='stock'
                component={Stock}
                options={{
                    title: 'Estoque',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="boxes" size={32} color={color} />,
                }}
            />
        </Navigator>
    )
}