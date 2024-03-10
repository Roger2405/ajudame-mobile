import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Pacotes de navegação
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Ícones
import { Feather, FontAwesome5 } from "@expo/vector-icons";

// Cores
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

// Telas
import ProductList from "../screens/ProductList";
import ProductStockList from "../screens/ProductStockList";

// Bottom tab geral
export function TabRoutes() {

    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createBottomTabNavigator();

    const buttonsCount = 3;
    const buttonWidth = 64;

    return (
        <Navigator
            screenOptions={({navigation, route}) => ({
                headerShown: false,
                tabBarButton: ( props ) => (
                    <CustomBottomTabButton
                        onPress={props.onPress}
                        {...props}
                        focused={navigation.isFocused(route.name)}
                    >
                    </CustomBottomTabButton>
                ),
                tabBarActiveTintColor: Colors[colorScheme].itemColor,
                tabBarInactiveTintColor: Colors.primary,
                tabBarStyle: { 
                    height: buttonWidth, 
                    width: buttonsCount * buttonWidth, left: "50%", 
                    transform: [{ translateX: -( buttonsCount * buttonWidth / 2 ) }] ,
                    marginBottom: 32,
                    position: "absolute",
                    borderRadius: 100,
                    opacity: 0.75,
                    backgroundColor: Colors[colorScheme].itemColor
                },
                tabBarLabelStyle: { textTransform: "uppercase", fontSize: 8 },
                tabBarShowLabel: false,
            })}
            initialRouteName="ProductsTabBar"
            safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}

        >
            <Screen
                name='StatisticsTabBar'
                component={UnavailableRoute}
                initialParams={{ type: 0 }}
                options={{
                    title: 'Estatísticas',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dollar-sign" size={28} color={color} />,
                }}
            />
            <Screen
                name='ProductsTabBar'
                initialParams={{ type: 0 }}
                component={ProductTabRoutes}
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={24} color={color} />,
                }}
            />
            <Screen
                name='Products'
                initialParams={{ type: 2 }}
                component={UnavailableRoute}
                options={{
                    title: 'Clientes',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={24} color={color} />,
                }}
            />
        </Navigator>
    )
}

export function UnavailableRoute() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recurso não disponível</Text>
        </View>
    )
}

export function ProductTabRoutes() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createBottomTabNavigator();

    const OPTIONS_ITEM_WIDTH = 48;
    const TAB_BAR_HEIGHT = 48;

    return (
        <Navigator
            screenOptions={({navigation, route}) => ({
                headerShown: false,
                tabBarButton: ( props ) => (
                    <CustomTopTabButton
                            onPress={props.onPress}
                            {...props}
                            isMenuButton={false}
                            focused={navigation.isFocused(route.name)}
                    >
                    </CustomTopTabButton>
                ),
                tabBarActiveBackgroundColor: Colors[colorScheme].background,
                tabBarActiveTintColor: Colors[colorScheme].textContrast,
                tabBarInactiveTintColor: Colors.primary,
                tabBarStyle: { top: 0, position: "absolute", backgroundColor: Colors[colorScheme].itemColor, borderRadius: 12, margin: 8, elevation: 8, height: TAB_BAR_HEIGHT },
                tabBarLabelStyle: { textTransform: "uppercase", fontSize: 8 },
                
                tabBarItemStyle: { borderTopLeftRadius: 8, borderTopRightRadius: 8, flexGrow: 1 },
            })}
            initialRouteName={"Products"}
            sceneContainerStyle={{ height: 200, zIndex: 100, paddingTop: TAB_BAR_HEIGHT + 8 }}
            safeAreaInsets={{top: 0, bottom: 0, left: 0, right: 0}}

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
                    tabBarButton: ( props ) => (
                        <CustomTopTabButton
                            onPress={props.onPress}
                            isMenuButton={true}
                            {...props}
                        >
                        </CustomTopTabButton>
                    ),
                    tabBarItemStyle: { flexBasis: OPTIONS_ITEM_WIDTH, flexGrow: 0, flexShrink: 0 },
                    tabBarLabelStyle: { display: 'none' },
                }}
            />
            <Screen
                name={"Products"}
                component={ProductsTopTabDrawer}
                options={{
                    title: "Produtos",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dollar-sign" size={32} color={color} />,
                }}
            />
            <Screen
                name={"Inputs"}
                component={UnavailableRoute}
                options={{
                    title: "Insumos",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={32} color={color} />,
                }}
            />
        </Navigator>
    )
}

function ProductsTopTabDrawer() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createMaterialTopTabNavigator();

    return (
        <Navigator
            screenOptions={({navigation, route}) => ({
                tabBarInactiveTintColor: Colors.gray,
                tabBarItemStyle: { padding: 0, borderRadius: 8 },
                tabBarActiveTintColor: Colors.primary,
                tabBarPressColor: Colors[colorScheme].itemColor,
				tabBarIndicatorStyle: { backgroundColor: Colors.primary, height: 28, margin: 2, borderRadius: 6 },
                tabBarLabelStyle: { fontSize: 16, lineHeight: 16, color: Colors.primary },
                tabBarStyle: { height: 32, backgroundColor: Colors[colorScheme].itemColor, borderRadius: 8, margin: 8, padding: 2 },
                tabBarLabel: ({ focused, color, children }) => {
                    const labelColor = focused ? Colors[colorScheme].itemColor : Colors.primary; // Define a cor do texto ativo e inativo
                    return <Text style={{ color: labelColor, margin: 0, marginBottom: 10, height: 28, left: 0 }}>{children}</Text>
                }
            })}
            initialRouteName='ProductList'
        >
            <Screen
                name="ProductList"
                component={ProductList}
                options={{
                    title: "Listagem",
                }}

            />
            <Screen
                name="ProductStock"
                component={ProductStockList}
                options={{
                    title: "Estoque",
                }}
            />
        </Navigator>
    )
}
/*
function InputsTopTabDrawer() {
    const colorScheme = useColorScheme();
    const { Screen, Navigator } = createMaterialTopTabNavigator();

    return (
        <Navigator
            screenOptions={({navigation, route}) => ({
                tabBarInactiveTintColor: Colors.gray,
                tabBarItemStyle: { padding: 0, borderRadius: 8 },
                tabBarActiveTintColor: Colors.primary,
								tabBarPressColor: Colors[colorScheme].itemColor,
								// tabBarIndicatorContainerStyle: { colo },
								tabBarIndicatorStyle: { backgroundColor: Colors.primary, height: 28, margin: 2, borderRadius: 6 },
                tabBarLabelStyle: { fontSize: 16, lineHeight: 16, color: Colors.primary },
                // tabBarIndicatorStyle: { backgroundColor: Colors.primary },
                tabBarStyle: { height: 32, backgroundColor: Colors[colorScheme].itemColor, borderRadius: 8, margin: 8, padding: 2 },
								tabBarLabel: ({ focused, color, children }) => {
										const labelColor = focused ? Colors[colorScheme].itemColor : Colors.primary; // Define a cor do texto ativo e inativo
				
										return (
											<Text style={{ color: labelColor, margin: 0, marginBottom: 10, height: 28, left: 0 }}>{children}</Text>
										);
								}
            })}
        >
            <Screen
                name="Home"
                component={ProductList}
                options={{
                    title: "Listagem",
                }}

            />
            <Screen
                name="historic"
                component={ProductStockList}
                options={{
                    title: "Estoque",
                }}
            />
        </Navigator>
    )
}

*/

const CustomBottomTabButton = ({ children, onPress, focused }: any) => {

    const colorScheme = useColorScheme();
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
            aspectRatio: 1/1,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            backgroundColor: focused ? Colors.primary : ( Colors[colorScheme].background + '00' ),
            zIndex: focused ? -1 : 10,
            position: "relative",
        }}
        
      > 
        <View>
            {children}
        </View>
      </TouchableOpacity>
    );
};

const CustomTopTabButton = ({ children, onPress, focused, isMenuButton }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
            flex: isMenuButton ? 0 : 1,
            width: isMenuButton && 48,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            backgroundColor: focused ? Colors.primary : Colors.white, // Altere as cores conforme necessário
            zIndex: focused ? -1 : 10,
            position: "relative",
            borderRadius: 8
        }}
        
      > 
        { 
        focused &&
            <View style={{ position: "absolute", height: 24, aspectRatio: 1/1, left: -12, bottom: 0, backgroundColor: Colors.primary }}></View>
        }
        <View>
            {children}
        </View>
        {
            focused &&
            <View style={{ position: "absolute", height: 24, aspectRatio: 1/1, right: -12, bottom: 0, backgroundColor: Colors.primary }}></View>
        }
      </TouchableOpacity>
    );
  };