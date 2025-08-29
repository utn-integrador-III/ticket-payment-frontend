import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";
import Toast from "react-native-toast-message";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
