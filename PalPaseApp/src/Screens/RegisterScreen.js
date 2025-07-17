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
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleRegister = () => {
    // Aquí debes realizar la lógica de registro
    console.log("Registrado con éxito", { nombreCompleto, telefono, correo });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleString());
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
        />
        <View style={styles.container}>
          <TextInput
            placeholder="Nombre Completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            style={styles.input}
          />
          <TextInput
            placeholder="Número de Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            style={styles.input}
          />
          <TextInput
            placeholder="Correo Electrónico"
            value={correo}
            onChangeText={setCorreo}
            style={styles.input}
          />
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
          />
          
          {/* Métodos de pago */}
          <TextInput
            placeholder="Nombre del Titular"
            value={titularTarjeta}
            onChangeText={setTitularTarjeta}
            style={styles.input}
          />
          <TextInput
            placeholder="Número de Tarjeta"
            value={numeroTarjeta}
            onChangeText={setNumeroTarjeta}
            style={styles.input}
          />
          <TextInput
            placeholder="Fecha de Expiración"
            value={fechaExpiracion}
            onChangeText={setFechaExpiracion}
            style={styles.input}
          />
          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            style={styles.input}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Ya tienes cuenta? Iniciar sesión</Text>
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
  registerButton: {
    backgroundColor: "#91cfd0",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#f5a6a6",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  loginText: {
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
