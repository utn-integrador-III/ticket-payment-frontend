import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

export default function DriverHomeScreen({ navigation }) {
  const handleScanQR = () => {
    // Redirige a la pantalla de escaneo de QR
    navigation.navigate("QRCodeScreen.js");
  };

  const handleLogout = () => {
    // Aquí iría el código para cerrar sesión, por ejemplo:
    // Limpiar el token o cualquier estado relevante
    navigation.replace("Login"); // Redirige a la pantalla de login
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")} // Fondo de la pantalla
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo-palpase.png")} // Logo de la aplicación
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bienvenido, Chofer</Text>

        {/* Botón para escanear QR */}
        <TouchableOpacity style={styles.button} onPress={handleScanQR}>
          <Text style={styles.buttonText}>Escanear QR</Text>
        </TouchableOpacity>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#91cfd0",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#f5a6a6",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
