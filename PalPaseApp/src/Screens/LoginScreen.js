import React from "react";
import { View, Text, Button } from "react-native";
import { showInfo } from "../Utils/Toast";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Inicio de Sesión</Text>
      <Button
        title="Ir a Registro"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Probar Toast"
        onPress={() => showInfo("Hola desde el toast!")}
      />
    </View>
  );
}
