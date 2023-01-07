import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SingleButton } from '../components/common/Buttons';
import { OptionsModal } from '../components/OptionsModal';

import Colors from "../constants/Colors";

import useColorScheme from "../hooks/useColorScheme";

import Home from "../screens/Home";
import Products from "../screens/Products";
import Stock from "../screens/Stock";

const { Screen, Group, Navigator } = createBottomTabNavigator();

export function TabRoutes() {
    const colorScheme = useColorScheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                //cores
                tabBarActiveBackgroundColor: Colors[colorScheme].background,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors[colorScheme].textContrast,
                //estilos
                tabBarStyle: { top: 0, position: "absolute", paddingTop: 8, height: 64 },
                tabBarItemStyle: { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                tabBarLabelStyle: { fontSize: 12, textTransform: "uppercase", fontWeight: '700' }

            }}
            initialRouteName="home"
            safeAreaInsets={{ left: 32 }}
            sceneContainerStyle={{ paddingTop: 64 }}

        >
            {/* <Screen
                name='options'
                component={OptionsModal}
                options={{
                    title: '',
                    tabBarItemStyle: { flexGrow: 0.25, paddingVertical: 8, transform: [{ translateY: 8 }] },
                    tabBarIcon: ({ color }) => <FontAwesome5 name='ellipsis-v' size={24} color={color} />,
                    // tabBarButton: () => <TouchableOpacity onPress={() => {}} style={{}} >
                    //     <FontAwesome5 name='ellipsis-v' size={24} />
                    // </TouchableOpacity>  
                    tabBarActiveBackgroundColor: undefined,
                    // tabBarActiveTintColor: Colors.white,
                }}

            /> */}
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