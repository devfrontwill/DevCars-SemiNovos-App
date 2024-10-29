import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { ToastProvider } from './src/context/toastContext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar backgroundColor="#F3F5F8" barStyle="dark-content" />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}

