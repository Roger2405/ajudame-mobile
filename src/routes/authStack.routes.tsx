import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthSignIn } from "../screens/Auth/AuthSignIn";



export function AuthRoutes() {
    const { Screen, Navigator } = createNativeStackNavigator();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='SignIn'
                component={AuthSignIn}
            />

        </Navigator>

    )
}