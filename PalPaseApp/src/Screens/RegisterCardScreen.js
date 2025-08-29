// PalPaseApp/screens/RegisterCardScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert
} from 'react-native';
import apiClient from '../Api/apiClient';
import AuthService from '../Services/AuthService';

export default function RegisterCardScreen({ navigation }) {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const validateCardData = () => {
    if (!cardHolder.trim()) {
      Alert.alert('Error', 'Por favor ingresa el titular de la tarjeta');
      return false;
    }
    if (!cardNumber.trim() || cardNumber.length < 13) {
      Alert.alert('Error', 'Por favor ingresa un número de tarjeta válido');
      return false;
    }
    if (!expiryDate.trim() || !expiryDate.includes('/')) {
      Alert.alert('Error', 'Por favor ingresa una fecha de expiración válida (MM/YY)');
      return false;
    }
    if (!cvv.trim() || cvv.length < 3) {
      Alert.alert('Error', 'Por favor ingresa un CVV válido');
      return false;
    }
    return true;
  };

  const handleAddCard = async () => {
    if (!validateCardData()) {
      return;
    }

    try {
      setLoading(true);
      console.log('RegisterCardScreen - Agregando método de pago...');
      
      const paymentMethodData = {
        card_holder: cardHolder.trim(),
        card_number: cardNumber.trim(),
        expiry: expiryDate.trim(),
        cvv: cvv.trim()
      };

      const response = await apiClient.post('/api/payment/methods', paymentMethodData);
      console.log('RegisterCardScreen - Respuesta:', response.data);

      if (response.data && response.data.message) {
        Alert.alert(
          'Éxito', 
          response.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                // Limpiar formulario
                setCardHolder('');
                setCardNumber('');
                setExpiryDate('');
                setCvv('');
                // Regresar a la pantalla anterior
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error('RegisterCardScreen - Error agregando tarjeta:', error);
      let errorMessage = 'Error al agregar la tarjeta';
      
      if (error.response && error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/logo-palpase.png')} 
          style={styles.logo}
        />

        

        <TextInput
          placeholder="Titular de la Tarjeta"
          placeholderTextColor="#555"
          style={styles.input}
          value={cardHolder}
          onChangeText={setCardHolder}
        />
        <TextInput
          placeholder="Número de Tarjeta"
          placeholderTextColor="#555"
          style={styles.input}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          placeholder="Fecha de expiración"
          placeholderTextColor="#555"
          style={styles.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          placeholder="CVV"
          placeholderTextColor="#555"
          style={styles.input}
          secureTextEntry
          keyboardType="numeric"
          value={cvv}
          onChangeText={setCvv}
        />

        <TouchableOpacity 
          style={[styles.addButton, loading && styles.addButtonDisabled]} 
          onPress={handleAddCard}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Agregar Tarjeta</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#F69CA5', // rosado
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#A4D4AE', // verde suave
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 15,
  },
  backButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});