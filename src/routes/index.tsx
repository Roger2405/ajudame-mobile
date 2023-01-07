import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { AuthSignIn } from "../screens/AuthSignIn";
import { AppRoutes } from "./stack.routes";


export function Routes() {
    const [isLogged, setIsLogged] = useState(false);
    AsyncStorage.getItem('user')
        .then((str) => {
            str && setIsLogged(true)
        })

    return (
        <NavigationContainer>
            {/* <TabRoutes /> */}
            {
                isLogged ?
                    <AppRoutes />
                    :
                    <AuthSignIn setIsLogged={setIsLogged} />

            }
        </NavigationContainer>
    )
}