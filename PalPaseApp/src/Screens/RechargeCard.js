import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import apiClient from '../Api/apiClient';

export default function RecargaTarjeta({ navigation }) {
  const [monto, setMonto] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Cargar métodos de pago al iniciar la pantalla
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoadingMethods(true);
      console.log('RechargeCard - Obteniendo métodos de pago...');
      
      const response = await apiClient.get('/api/payment/methods');
      console.log('RechargeCard - Respuesta:', response.data);
      
      if (response.data && response.data.payment_methods) {
        setPaymentMethods(response.data.payment_methods);
        console.log('RechargeCard - Métodos de pago cargados:', response.data.count);
      } else {
        setPaymentMethods([]);
      }
    } catch (error) {
      console.error('RechargeCard - Error obteniendo métodos de pago:', error);
      Alert.alert('Error', 'No se pudieron cargar los métodos de pago');
    } finally {
      setLoadingMethods(false);
    }
  };

  const realizarRecarga = async () => {
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Debe ingresar un monto válido.');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Debe seleccionar una tarjeta.');
      return;
    }

    try {
      setLoading(true);
      // Generar un payment_method_id simulado basado en la tarjeta seleccionada
      const paymentMethodId = `pm_${selectedPaymentMethod.card_number.slice(-4)}_${selectedPaymentMethod.card_holder.replace(/\s+/g, '').toLowerCase()}`;
      
      console.log('RechargeCard - Realizando recarga:', {
        amount: parseFloat(monto),
        payment_method_id: paymentMethodId,
        card_holder: selectedPaymentMethod.card_holder
      });
      
      // Llamar a la API de recarga con la estructura correcta
      const response = await apiClient.post('/api/wallet/topup', {
        amount: parseFloat(monto),
        payment_method_id: paymentMethodId
      });
      
      console.log('RechargeCard - Respuesta de recarga:', response.data);
      
      if (response.data && response.data.message) {
        Alert.alert(
          'Recarga Exitosa', 
          `${response.data.message}\nNuevo saldo: ₡${response.data.balance}`,
          [
            {
              text: 'OK',
              onPress: () => {
                setMonto('');
                setTarjeta('');
                setSelectedPaymentMethod(null);
                // Opcional: navegar de regreso
                navigation.goBack();
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('RechargeCard - Error realizando recarga:', error);
      
      if (error.response && error.response.data && error.response.data.detail) {
        Alert.alert('Error', error.response.data.detail);
      } else {
        Alert.alert('Error', 'No se pudo realizar la recarga. Inténtalo de nuevo.');
      }
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

      <Text style={styles.title}>Digite monto</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="₡0.00"
        value={monto}
        onChangeText={setMonto}
      />

      <Text style={styles.title}>Seleccionar Tarjeta</Text>
      {loadingMethods ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#666" />
          <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
        </View>
      ) : (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPaymentMethod ? selectedPaymentMethod.card_holder : ''}
            onValueChange={(itemValue) => {
              const method = paymentMethods.find(m => m.card_holder === itemValue);
              setSelectedPaymentMethod(method || null);
              setTarjeta(itemValue);
            }}
            enabled={paymentMethods.length > 0}
          >
            <Picker.Item label={paymentMethods.length > 0 ? "Elegir tarjeta" : "No hay tarjetas disponibles"} value="" />
            {paymentMethods.map((method, index) => (
              <Picker.Item 
                label={`**** **** **** ${method.card_number.slice(-4)} (${method.card_holder})`} 
                value={method.card_holder} 
                key={index} 
              />
            ))}
          </Picker>
        </View>
      )}

      {/* Información de la tarjeta seleccionada */}
      {selectedPaymentMethod && (
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoTitle}>Tarjeta Seleccionada:</Text>
          <Text style={styles.cardInfoText}>Titular: {selectedPaymentMethod.card_holder}</Text>
          <Text style={styles.cardInfoText}>Número: **** **** **** {selectedPaymentMethod.card_number.slice(-4)}</Text>
          <Text style={styles.cardInfoText}>Vencimiento: {selectedPaymentMethod.expiry}</Text>
        </View>
      )}

      <TouchableOpacity 
        style={[styles.button, (loading || !selectedPaymentMethod || !monto) && styles.buttonDisabled]} 
        onPress={realizarRecarga}
        disabled={loading || !selectedPaymentMethod || !monto}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.buttonText}>Realizar Recarga</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
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
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
     width: 150,
    height: 150,
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#ffe4e4',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffc0cb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#b0ccc4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  cardInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardInfoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
