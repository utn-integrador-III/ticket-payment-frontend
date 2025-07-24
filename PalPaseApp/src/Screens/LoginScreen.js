import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import apiClient from "../Api/apiClient";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/login", {
        email: email.trim().toLowerCase(),
        password: contrasena,
      });

      const data = response.data;

      navigation.replace("Home", { userId: data.user_id, token: data.access_token });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Error de conexión con el servidor");
      }
      console.error(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleString()); // Establecer la hora de última actualización
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Image
          source={require("../../assets/logo-palpase.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.container}>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#333"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Inicio Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>

          {/* Última actualización */}
          <Text style={styles.lastUpdated}>Última actualización: {lastUpdated}</Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 40,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#ffffffcc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  loginButton: {
    backgroundColor: "#91cfd0",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#f5a6a6",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  lastUpdated: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
});
