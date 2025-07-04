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
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [titularTarjeta, setTitularTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleRegister = () => {
    // Aquí deberías enviar los datos al backend o validarlos localmente
    console.log("Registrando:", {
      nombreCompleto,
      titularTarjeta,
      numeroTarjeta,
      fechaExpiracion,
      cvv,
      telefono,
      correo,
      usuario,
      contrasena,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/logo-palpase.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.container}>
          <TextInput
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Titular de la tarjeta"
            value={titularTarjeta}
            onChangeText={setTitularTarjeta}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Número de tarjeta"
            value={numeroTarjeta}
            onChangeText={setNumeroTarjeta}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Fecha de expiración (MM/AA)"
            value={fechaExpiracion}
            onChangeText={setFechaExpiracion}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Número de teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.registerText}>Volver al inicio</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
});