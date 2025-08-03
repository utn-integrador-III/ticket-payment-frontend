import React, { useState } from 'react';
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
  ImageBackground
} from 'react-native';

export default function RecargaTarjeta({ navigation }) {
  const [monto, setMonto] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Tarjetas simuladas
  const tarjetas = [
    { id: '1', alias: 'Tarjeta VISA' },
    { id: '2', alias: 'Trabajo' },
  ];

  const realizarRecarga = async () => {
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert('Error', 'Debe ingresar un monto válido.');
      return;
    }

    if (!tarjeta) {
      Alert.alert('Error', 'Debe seleccionar una tarjeta.');
      return;
    }

    try {
      // Aquí deberías hacer el fetch real al backend
      // Simulación de éxito:
      setMensaje('La recarga se ha realizado exitosamente.');
      Alert.alert('Se realizo la recarga.', mensaje);
      setMonto('');
      setTarjeta('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la recarga.');
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tarjeta}
          onValueChange={(itemValue) => setTarjeta(itemValue)}
        >
          <Picker.Item label="Elegir tarjeta" value="" />
          {tarjetas.map((t) => (
            <Picker.Item label={t.alias} value={t.id} key={t.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={realizarRecarga}>
        <Text style={styles.buttonText}>Realizar Recarga</Text>
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
});
