import React from "react";
import { View, Text, Button } from "react-native";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Registro</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}
