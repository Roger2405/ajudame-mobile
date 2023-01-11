
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import AuthContext from "../contexts/auth";
import { AppRoutes } from "./appStack.routes";
import { AuthRoutes } from "./authStack.routes";


export function Routes() {

    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        <View>
            <ActivityIndicator />
        </View>
    }
    return signed ? <AppRoutes /> : <AuthRoutes />

}