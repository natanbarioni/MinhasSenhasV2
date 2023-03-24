import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <Routes />
      <Toast />
    </>
  );
}