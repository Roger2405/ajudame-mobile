import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>

      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor='transparent' />
          <Routes />
        </SafeAreaProvider>
      </AuthProvider >
    </NavigationContainer>
  );
}