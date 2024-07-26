import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F3F5F8" barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
  );
}

