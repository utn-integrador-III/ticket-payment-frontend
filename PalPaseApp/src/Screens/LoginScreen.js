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
import AuthService from "../Services/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleLogin = async () => {
    try {
      console.log('Intentando login con:', email);
      
      let response;
      let userType = null;
      
      // Primero intentar login como usuario (pasajero)
      try {
        response = await apiClient.post("/api/login", {
          email: email.trim().toLowerCase(),
          password: contrasena,
        });
        userType = "user";
        console.log('Login exitoso como usuario');
      } catch (userError) {
        console.log('Error con login de usuario:', userError.response?.status);
        
        // Si falla como usuario, intentar como chofer
        try {
          response = await apiClient.post("/api/driver/login", {
            email: email.trim().toLowerCase(),
            password: contrasena,
          });
          userType = "driver";
          console.log('Login exitoso como chofer');
        } catch (driverError) {
          console.log('Error con login de chofer:', driverError.response?.status);
          // Si ambos fallan, mostrar error del usuario
          throw userError;
        }
      }

      const responseData = response.data;
      console.log('Datos recibidos:', responseData);

      // Extraer datos del objeto data si existe (estructura del backend)
      const data = responseData.data || responseData;
      console.log('Datos procesados:', data);

      // Manejar respuesta según el tipo de usuario
      if (userType === "user") {
        // Usuario normal - estructura: { access_token, token_type, user: { id, balance, email, name } }
        if (data.access_token && data.user && data.user.id) {
          await AuthService.setAuthData(data.access_token, data.user.id, "user");
          console.log('Login exitoso como usuario, navegando a Home');
          navigation.replace("Home");
        } else {
          console.log('Estructura de respuesta de usuario inesperada:', data);
          console.log('Campos disponibles:', Object.keys(data));
          alert("Error: Respuesta del servidor no válida para usuario");
        }
      } else if (userType === "driver") {
        // Chofer - estructura: { access_token, token_type, driver: { id, name, email, license_number } }
        if (data.access_token && data.driver && data.driver.id) {
          await AuthService.setAuthData(data.access_token, data.driver.id, "driver");
          console.log('Login exitoso como chofer, navegando a QRCodeScreen');
          navigation.replace("QRCodeScreen");
        } else {
          console.log('Estructura de respuesta de chofer inesperada:', data);
          console.log('Campos disponibles:', Object.keys(data));
          alert("Error: Respuesta del servidor no válida para chofer");
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      } else if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        alert("Error de conexión con el servidor");
      }
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
