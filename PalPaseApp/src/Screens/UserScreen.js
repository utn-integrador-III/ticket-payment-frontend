import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

export default function UserProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Simula una carga de datos
    setTimeout(() => {
      const mockUser = {
        id: 12345,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        balance: 12000.5,
        payment_methods: [
          { type: 'Visa', card_number: '**** 1234' },
          { type: 'MasterCard', card_number: '**** 5678' },
        ],
      };
      setUser(mockUser);
      setLoading(false);
      setLastUpdated(new Date().toLocaleString());  // Fecha y hora de la última actualización
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#91cfd0" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/fondo.png')}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.contentBox}>
          <Text style={styles.title}>Perfil de Usuario</Text>

          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{user.id}</Text>

          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Saldo:</Text>
          <Text style={styles.value}>₡{user.balance.toFixed(2)}</Text>

          <Text style={styles.label}>Métodos de pago:</Text>
          {user.payment_methods.length === 0 ? (
            <Text style={styles.value}>Sin métodos de pago</Text>
          ) : (
            user.payment_methods.map((pm, index) => (
              <View key={index} style={styles.paymentMethod}>
                <Text style={styles.value}>
                  • {pm.type} - {pm.card_number}
                </Text>
              </View>
            ))
          )}

          {/* Mostrar última actualización */}
          <Text style={styles.lastUpdated}>Última actualización: {lastUpdated}</Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contentBox: {
    backgroundColor: '#ffffffcc',
    borderRadius: 15,
    padding: 25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#184e77',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#184e77',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  paymentMethod: {
    marginLeft: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: '#184e77',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
