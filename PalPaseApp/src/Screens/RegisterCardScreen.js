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
  ImageBackground
} from 'react-native';

export default function RegisterCardScreen({ navigation }) {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    alert("Tarjeta agregada exitosamente");
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

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Agregar Tarjeta</Text>
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