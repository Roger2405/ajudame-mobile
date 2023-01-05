/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity } from 'react-native';


import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';


import TabSales from '../screens/TabSales';
import TabProducts from '../screens/TabProducts';
import TabStock from '../screens/TabStock';

import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AddSales } from '../screens/AddSales';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="AddSales" component={AddSales} options={{ title: 'Adicionar Vendas' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Tab = createMaterialTopTabNavigator<RootTabParamList>();

function TabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="TabSales"
      screenOptions={{
      }}>
      <Tab.Screen
        name="TabSales"
        component={TabSales}

        options={() => ({
          title: 'Vendas',
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar-sign" color={color} />,
        })}
      />
      <Tab.Screen
        name="TabProducts"
        component={TabProducts}
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="box" color={color} />,
        }}
      />
      <Tab.Screen
        name="TabStock"
        component={TabStock}
        options={{
          title: 'Estoque',
          tabBarIcon: ({ color }) => <TabBarIcon name="boxes" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ margin: -5, alignSelf: 'center' }} {...props} />;
}
