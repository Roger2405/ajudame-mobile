import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import useCachedResources from './hooks/useCachedResources';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsProvider } from './src/contexts/products';
// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

export default function App() {
  // const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  return (
    <NavigationContainer>

      <AuthProvider>
        <ProductsProvider>
          <SafeAreaProvider>
            <StatusBar translucent />
            <Routes />
            {/* <Navigation colorScheme={colorScheme} /> */}
          </SafeAreaProvider>
        </ProductsProvider>
      </AuthProvider >
    </NavigationContainer>
  );
}
// }
