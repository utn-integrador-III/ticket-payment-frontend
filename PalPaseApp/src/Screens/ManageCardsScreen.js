import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ManageCardsScreen() {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState("Tarjeta 1");

  const handleSelectCard = () => {
    Alert.alert(
      "Seleccionar Tarjeta",
      "Aquí podrías mostrar un selector real",
      [
        { text: "Tarjeta 1", onPress: () => setSelectedCard("Tarjeta 1") },
        { text: "Tarjeta 2", onPress: () => setSelectedCard("Tarjeta 2") },
        { text: "Tarjeta 3", onPress: () => setSelectedCard("Tarjeta 3") },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Iconos */}
      <TouchableOpacity
        style={styles.iconTopLeft}
        onPress={() => navigation.navigate("User")}
      >
        <Image
          source={require("../../assets/profile-icon.png")}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconTopRight}>
        <Image
          source={require("../../assets/logout-icon.png")}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/logo-palpase.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Simulación de combo box */}
      <Text style={styles.label}>Seleccionar Tarjeta</Text>

      <TouchableOpacity style={styles.comboButton} onPress={handleSelectCard}>
        <Text style={styles.comboText}>
          {selectedCard} ▼
        </Text>
      </TouchableOpacity>

      {/* Botones */}
      <TouchableOpacity style={styles.buttonRed}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonPink}
        onPress={() => navigation.navigate("RegisterCard")}
      >
        <Text style={styles.buttonText}>Agregar Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGreen}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
  iconTopLeft: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  iconTopRight: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  comboButton: {
    backgroundColor: "#fca7a7",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  comboText: {
    color: "#000",
    fontSize: 16,
  },
  buttonRed: {
    backgroundColor: "#fca7a7",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonPink: {
    backgroundColor: "#fca7a7",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonGreen: {
    backgroundColor: "#a5d2cf",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});
