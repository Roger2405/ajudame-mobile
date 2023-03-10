import { AppRoutes } from "./appStack.routes";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";

import React from "react";
import { Text, StyleSheet, TouchableOpacity, Pressable, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../contexts/auth";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
// import {} from '@reac'

export function DrawerNav() {
    const Drawer = createDrawerNavigator();
    return (

        <Drawer.Navigator
            drawerContent={(props: any) => <MenuItems {...props} />}
            initialRouteName="Main"
            defaultStatus={'closed'}
            // useLegacyImplementation={true}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Main" component={AppRoutes} />
        </Drawer.Navigator>
    )
}

function MenuItems({ navigation }: any) {
    const { user, signOut } = useAuth();
    const colorSheme = useColorScheme();
    return (
        <DrawerContentScrollView
            style={{
                backgroundColor: Colors[colorSheme].background,
                paddingHorizontal: 8,
                paddingBottom: 40
            }}
            contentContainerStyle={styles.container}
        >
            <Pressable onPress={() => navigation.closeDrawer()}>
                <Feather name="x" size={32} color={Colors.gray} />
            </Pressable>
            <View style={styles.content}>
                <Text style={styles.email}>{user?.email}</Text>
                {/* <TouchableOpacity>
                    <Text>Minha Conta</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.routeLink}>
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                    <Text style={{ fontSize: 16 }}>Minha Conta</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity onPress={signOut} style={styles.signOut}>
                <Feather name="log-out" size={24} color={Colors.gray} />
                <Text style={{ fontSize: 16, marginLeft: 16, color: Colors.gray, fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "flex-start",
        // flexBasis: '100%',
    },
    title: {

    },
    email: {
    },
    routeLink: {
        paddingVertical: 8,
        marginVertical: 8,

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
        flexDirection: "row",
        alignItems: "center",

        // backgroundColor: Colors.lightGray,
        borderRadius: 4,
    },
    separator: {
        height: 2,
        // marginHorizontal: 8,
        backgroundColor: Colors.lightGray
    },
    signOut: {
        marginTop: 'auto',
        paddingTop: 16,
        // borderColor: Colors.gray,
        flexDirection: "row",
        alignItems: "center",
        // fontSize: 20,
    }
})