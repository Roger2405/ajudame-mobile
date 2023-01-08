import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OptionsModal } from './src/components/OptionsModal';
// import useCachedResources from './hooks/useCachedResources';
import { Routes } from './src/routes';
import AuthContext, { AuthProvider } from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native';
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
        <SafeAreaProvider>
          <StatusBar hidden />
          <Routes />
          {/* <Navigation colorScheme={colorScheme} /> */}
        </SafeAreaProvider>
      </AuthProvider >
    </NavigationContainer>
  );
}
// }
