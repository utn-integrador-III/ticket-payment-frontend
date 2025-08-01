import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Iconos */}
        <TouchableOpacity
          style={styles.iconTopLeft}
          onPress={() => navigation.navigate("User")} // <- Aquí se agrega el evento
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
        <Image
          source={require("../../assets/logo-palpase.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>¡Bienvenido a PalPase!</Text>
        <Text style={styles.subtitle}>
          Tu aplicación para el pago de pasajes de bus
        </Text>
        {/* Monto */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Monto</Text>
          <Text style={styles.balanceAmount}>₡15.000</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QRCode")}
        >
          <Text style={styles.buttonText}>Ver mi código QR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Recargar")}
        >
          <Text style={styles.buttonText}>Recargar tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Historial")}
        >
          <Text style={styles.buttonText}>Ver historial de pagos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Administrar")}
        >
          <Text style={styles.buttonText}>Administrar Tarjetas</Text>
        </TouchableOpacity>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Última actualización: {lastUpdated}
          </Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
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
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  balanceContainer: {
    backgroundColor: "#a5d2cf",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#333",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#fca7a7",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
});
