import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Feather, FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import useColorScheme from "../hooks/useColorScheme";

import Historic from "../screens/Historic";
import Home from "../screens/Home";
import Products from "../screens/Products";
import Stock from "../screens/Stock";
import React from "react";



export function TabRoutes() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator, Group } = createBottomTabNavigator();

    const OPTIONS_ITEM_WIDTH = 48;
    const TAB_BAR_HEIGHT = 84;
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                //cores
                tabBarActiveBackgroundColor: Colors[colorScheme].background,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors[colorScheme].textContrast,
                //estilos
                tabBarStyle: { top: 0, position: "absolute", backgroundColor: Colors.primary, paddingTop: 32, height: TAB_BAR_HEIGHT, paddingRight: OPTIONS_ITEM_WIDTH, shadowColor: Colors[colorScheme].background },
                tabBarItemStyle: { borderTopLeftRadius: 8, borderTopRightRadius: 8, flexGrow: 1 },
                tabBarLabelStyle: { fontSize: 12, textTransform: "uppercase", fontWeight: '700' },
            }}
            initialRouteName="TopTabBar"
            sceneContainerStyle={{ paddingTop: TAB_BAR_HEIGHT }}


        >
            <Screen
                name='Menu'
                component={React.Component}
                listeners={(({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.openDrawer();
                    }
                }))}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="menu" size={32} color={color} />,
                    tabBarItemStyle: { flexBasis: OPTIONS_ITEM_WIDTH, flexGrow: 0, flexShrink: 0 },
                    tabBarLabelStyle: { display: 'none' },

                }}


            />
            {/* <Group screenOptions={}>

            </Group> */}

            <Screen
                name='TopTabBar'
                component={TopTabBar}
                options={{
                    title: 'Vendas',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dollar-sign" size={32} color={color} />,
                }}

            />
            <Screen
                name='Products'
                component={Products}
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={32} color={color} />,
                }}
            />
            <Screen
                name='Stock'
                component={Stock}
                options={{
                    title: 'Estoque',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="boxes" size={32} color={color} />,
                }}
            />
        </Navigator>
    )
}

function TopTabBar() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createMaterialTopTabNavigator();

    return (
        <Navigator
            screenOptions={{
                tabBarInactiveTintColor: Colors.gray,
                tabBarItemStyle: { padding: 0, margin: 0 },
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: { fontSize: 16, marginBottom: 16, lineHeight: 16, },
                // tabBarContentContainerStyle: { height: 32, },
                tabBarIndicatorStyle: { backgroundColor: Colors.primary, height: 4 },
                tabBarStyle: { shadowColor: Colors[colorScheme].background, height: 32, backgroundColor: Colors[colorScheme].background }
            }}
        // sceneContainerStyle={{ paddingTop: 0 }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    title: "Vendas do dia",
                }}

            />
            <Screen
                name="historic"
                component={Historic}
                options={{
                    title: "Histórico",
                }}
            />
        </Navigator>
    )
}