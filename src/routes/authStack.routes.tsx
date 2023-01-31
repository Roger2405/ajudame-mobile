import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthSignIn } from "../screens/Auth/AuthSignIn";
import { AuthSignUp } from "../screens/Auth/AuthSignUp";



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
            <Screen
                name='SignUp'
                component={AuthSignUp}
            />
        </Navigator>

    )
}