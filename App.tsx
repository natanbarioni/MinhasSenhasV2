import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Routes } from "./src/routes";
import mobileAds from 'react-native-google-mobile-ads';
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log(adapterStatuses)
    });
  }, [])
  return (
    <>
      <StatusBar style="light" />
      <Routes />
      <Toast />
    </>
  );
}
