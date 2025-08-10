import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import HomeScreen from "../Screens/HomeScreen";
import UserScreen from "../Screens/UserScreen"; 
import QRCodeScreen from "../Screens/QRCodeScreen";
import ManageCardsScreen from "../Screens/ManageCardsScreen";
import RegisterCardScreen from "../Screens/RegisterCardScreen"; 
import RecargaTarjeta from "../Screens/RechargeCard";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />
      <Stack.Screen name="ManageCards" component={ManageCardsScreen} />
      <Stack.Screen name="RegisterCard" component={RegisterCardScreen} />
      <Stack.Screen name="RechargeCard" component={RecargaTarjeta} />
    </Stack.Navigator>
  );
}
