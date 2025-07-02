import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ImageBackground,} from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Iconos */}
        <TouchableOpacity style={styles.iconTopLeft}>
          <Image source={require('../../assets/profile-icon.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTopRight}>
          <Image source={require('../../assets/logout-icon.png')} style={styles.iconImage} />
        </TouchableOpacity>

        {/* Logo */}
        <Image source={require('../../assets/logo-palpase.png')} style={styles.logo} />

        {/* Monto */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Monto</Text>
          <Text style={styles.balanceAmount}>₡15.000</Text>
        </View>

        {/* Botones */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MostrarQR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recargar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Administrar Tarjetas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  iconTopLeft: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  iconTopRight: {
    position: 'absolute',
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
    resizeMode: 'contain',
  },
  balanceContainer: {
    backgroundColor: '#a5d2cf',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#fca7a7',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
