
import Colors from "../constants/Colors";

import useColorScheme from "../hooks/useColorScheme";

import { OptionsModal } from "../components/OptionsModal";
import { AppRoutes } from "./appStack.routes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Button, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthSignIn } from "../screens/Auth/AuthSignIn";
import { useAuth } from "../contexts/auth";
// import {} from '@reac'

export function DrawerNav() {
    const { Screen, Navigator } = createDrawerNavigator();
    const { signOut } = useAuth();
    return (
        <Navigator initialRouteName="App"
            // sceneContainerStyle={{ paddingTop: 0 }}
            screenOptions={{


            }}
        >
            <Screen
                name="App"
                component={AppRoutes}
                options={
                    {
                        drawerIcon: () => <Feather name="x" size={32} />,
                        title: '',
                        // headerTitleStyle: { textAlign: "right", backgroundColor: 'green' }

                    }
                }
            // listeners={(({ navigation }) => ({
            //     tabPress: event => {
            //         event.preventDefault();
            //         navigation.openDrawer();
            //     }
            // }))}
            />
            <Screen
                name="LogOut"
                component={AuthSignIn}
                listeners={(({ navigation }) => ({
                    focus: () => {
                        signOut()
                    }
                })

                )}
            />

        </Navigator>
    )
}
function Feed({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
            <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
        </View>
    );
}