import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { ToastProvider } from './src/context/toastContext';

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

