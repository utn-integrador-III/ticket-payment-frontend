import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

const fondoImage = require("../../assets/fondo.png");

export default function ChangePasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleConfirm = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    if (newPassword === confirmPassword) {
      Alert.alert("Éxito", "Contraseña cambiada correctamente.", [
        { text: "OK", onPress: () => navigation.navigate("User") },
      ]);
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden.");
    }
  };

  return (
    <ImageBackground source={fondoImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Cambiar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar nueva contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f97171", marginTop: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#184e77",
  },
  input: {
    backgroundColor: "#ffffffcc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#91cfd0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#319",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
});
