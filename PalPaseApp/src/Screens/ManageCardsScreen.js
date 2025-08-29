import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../Api/apiClient";
import AuthService from "../Services/AuthService";

export default function ManageCardsScreen() {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      console.log('ManageCardsScreen - Obteniendo métodos de pago...');
      
      const response = await apiClient.get('/api/payment/methods');
      console.log('ManageCardsScreen - Respuesta completa:', response.data);
      
      // Extraer datos del objeto data si existe (estructura del backend)
      const responseData = response.data.data || response.data;
      console.log('ManageCardsScreen - Datos procesados:', responseData);
      
      if (responseData && responseData.payment_methods) {
        setPaymentMethods(responseData.payment_methods);
        // Seleccionar la primera tarjeta por defecto si existe
        if (responseData.payment_methods.length > 0) {
          setSelectedCard(responseData.payment_methods[0]);
        }
        console.log('ManageCardsScreen - Métodos de pago cargados:', responseData.count || responseData.payment_methods.length);
      } else {
        console.log('ManageCardsScreen - No se encontraron payment_methods en la respuesta');
        console.log('ManageCardsScreen - Campos disponibles:', Object.keys(responseData || {}));
        setPaymentMethods([]);
      }
    } catch (error) {
      console.error('ManageCardsScreen - Error obteniendo métodos de pago:', error);
      console.error('ManageCardsScreen - Error response:', error.response?.data);
      Alert.alert('Error', 'No se pudieron cargar los métodos de pago');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPaymentMethods();
  };

  const handleSelectCard = () => {
    if (paymentMethods.length === 0) {
      Alert.alert('Sin tarjetas', 'No tienes métodos de pago registrados');
      return;
    }

    const options = paymentMethods.map((method, index) => ({
      text: `**** **** **** ${method.card_number.slice(-4)} (${method.card_holder})`,
      onPress: () => setSelectedCard(method)
    }));

    options.push({ text: "Cancelar", style: "cancel" });

    Alert.alert("Seleccionar Tarjeta", "Elige una tarjeta:", options);
  };

  const handleDeleteCard = () => {
    if (!selectedCard) {
      Alert.alert('Error', 'Por favor selecciona una tarjeta para eliminar');
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar la tarjeta de ${selectedCard.card_holder}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('ManageCardsScreen - Eliminando tarjeta:', selectedCard.card_holder);
              
              // Usar card_holder como identificador para la eliminación
              const response = await apiClient.delete(`/api/payment/methods/${encodeURIComponent(selectedCard.card_holder)}`);
              console.log('ManageCardsScreen - Tarjeta eliminada exitosamente');
              
              Alert.alert('Éxito', 'Tarjeta eliminada correctamente');
              
              // Recargar la lista de métodos de pago
              await fetchPaymentMethods();
              
              // Limpiar la selección
              setSelectedCard(null);
              
            } catch (error) {
              console.error('ManageCardsScreen - Error eliminando tarjeta:', error);
              
              if (error.response && error.response.data && error.response.data.detail) {
                Alert.alert('Error', error.response.data.detail);
              } else {
                Alert.alert('Error', 'No se pudo eliminar la tarjeta. Inténtalo de nuevo.');
              }
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

        {/* Estado de carga */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
          </View>
        ) : (
          <>
            {/* Selector de tarjeta */}
            <Text style={styles.label}>
              Métodos de Pago ({paymentMethods.length})
            </Text>

            {paymentMethods.length > 0 ? (
              <>
                <TouchableOpacity style={styles.comboButton} onPress={handleSelectCard}>
                  <Text style={styles.comboText}>
                    {selectedCard 
                      ? `${selectedCard.card_holder}`
                      : 'Seleccionar tarjeta'
                    } ▼
                  </Text>
                </TouchableOpacity>

                {/* Información de la tarjeta seleccionada */}
                {selectedCard && (
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardInfoTitle}>Tarjeta Seleccionada:</Text>
                    <Text style={styles.cardInfoText}>Titular: {selectedCard.card_holder}</Text>
                    <Text style={styles.cardInfoText}>Número: **** **** **** {selectedCard.card_number.slice(-4)}</Text>
                    <Text style={styles.cardInfoText}>Vencimiento: {selectedCard.expiry}</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes métodos de pago registrados</Text>
                <Text style={styles.emptySubtext}>Agrega una tarjeta para comenzar</Text>
              </View>
            )}
          </>
        )}

        {/* Botones */}
        <TouchableOpacity 
          style={[styles.buttonRed, (!selectedCard || loading) && styles.buttonDisabled]} 
          onPress={handleDeleteCard}
          disabled={!selectedCard || loading}
        >
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
  scrollContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
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
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  cardInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
  },
  cardInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardInfoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
