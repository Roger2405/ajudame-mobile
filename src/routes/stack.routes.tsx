import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddSales } from "../screens/AddSales";
import Home from "../screens/Home";
import { Summary } from "../screens/Summary";
import { TabRoutes } from "./tab.routes";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='Root'
                component={TabRoutes}
            />
            <Screen
                name='AddSales'
                component={AddSales}
            />
            <Screen
                name='Summary'
                component={Summary}
            />

        </Navigator>
    )
}