import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import apiClient from "../Api/apiClient";
import AuthService from "../Services/AuthService";

export default function QRCodeScreen() {
  const navigation = useNavigation();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserQR();
  }, []);

  const fetchUserQR = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('QRCodeScreen - Obteniendo código QR del usuario...');
      
      const response = await apiClient.get('/api/user/qr');
      console.log('QRCodeScreen - Respuesta completa:', response.data);
      
      // Extraer datos del objeto data si existe (estructura del backend)
      const responseData = response.data.data || response.data;
      console.log('QRCodeScreen - Datos procesados:', responseData);
      
      if (responseData) {
        // La respuesta tiene: { qr_code, qr_data, user_id, user_name }
        setQrData(responseData.qr_data); // ID del usuario para el QR
        setUserInfo({
          id: responseData.user_id,
          name: responseData.user_name,
          qr_code: responseData.qr_code // Base64 image si quieres usarla
        });
        console.log('QRCodeScreen - QR cargado para usuario:', responseData.user_name);
      } else {
        console.log('QRCodeScreen - No se encontraron datos en la respuesta');
        console.log('QRCodeScreen - Campos disponibles:', Object.keys(responseData || {}));
        setError('No se pudo obtener el código QR');
      }
    } catch (error) {
      console.error('QRCodeScreen - Error obteniendo QR:', error);
      setError('Error al cargar el código QR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../../assets/logo-palpase.png")}
          style={styles.logo}
        />

        {/* Información del usuario */}
        {userInfo && (
          <Text style={styles.userInfo}>
            {userInfo.name}
          </Text>
        )}

        {/* Código QR o Loading */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loadingText}>Generando código QR...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchUserQR}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : qrData ? (
          <QRCode value={qrData} size={200} />
        ) : (
          <Text style={styles.errorText}>No se pudo generar el código QR</Text>
        )}

        {/* Botón Regresar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
    resizeMode: "contain",
  },
  userInfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#a5d2cf",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 30,
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
