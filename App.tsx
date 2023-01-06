import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import useCachedResources from './hooks/useCachedResources';
import { Routes } from './src/routes';

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
    <SafeAreaProvider>
      <StatusBar hidden />
      <Routes />
      {/* <Navigation colorScheme={colorScheme} /> */}
    </SafeAreaProvider>
  );
}
// }
