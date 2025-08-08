import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import apiClient from "../Api/apiClient";
import { useSimpleLanguage } from "../hooks/useSimpleLanguage";
import SimpleLanguageSelector from "../components/SimpleLanguageSelector";


export default function RegisterScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { t } = useSimpleLanguage();

  // Campos de tarjeta
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleRegister = async () => {
    try {
      // Construir el payload básico
      const payload = {
        name: nombreCompleto,
        email: correo.trim().toLowerCase(),
        password: contrasena,
      };

      // Si el usuario llenó los datos de la tarjeta, agrega payment_method
      if (showCard && cardHolder && cardNumber && expiry && cvv) {
        payload.payment_method = {
          card_holder: cardHolder,
          card_number: cardNumber,
          expiry: expiry,
          cvv: cvv,
        };
      }

      const response = await apiClient.post("/register", payload);

      if (response.data && response.data.error) {
        alert(response.data.error || t('registerError'));
        return;
      }

      alert(t('registerSuccess'));
      navigation.goBack();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(error.response.data.detail);
      } else {
        alert(t('registerError'));
      }
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../assets/logo-palpase.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.container}>
          {/* Language selector button */}
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Text style={styles.languageButtonText}>🌐</Text>
          </TouchableOpacity>

          <TextInput
            placeholder={t('fullName')}
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder={t('email')}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder={t('password')}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: showCard ? "#f5a6a6" : "#91cfd0" }]}
            onPress={() => setShowCard(!showCard)}
          >
            <Text style={styles.loginText}>
              {showCard ? t('removeCard') : t('addCard')}
            </Text>
          </TouchableOpacity>

          {showCard && (
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <TextInput
                placeholder={t('cardHolder')}
                value={cardHolder}
                onChangeText={setCardHolder}
                style={styles.input}
                placeholderTextColor="#333"
              />
              <TextInput
                placeholder={t('cardNumber')}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#333"
                maxLength={16}
              />
              <TextInput
                placeholder={t('expiryDate')}
                value={expiry}
                onChangeText={setExpiry}
                style={styles.input}
                placeholderTextColor="#333"
                maxLength={5}
              />
              <TextInput
                placeholder={t('cvv')}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#333"
                maxLength={4}
                secureTextEntry
              />
            </View>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginText}>{t('register')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.registerText}>{t('back')}</Text>
          </TouchableOpacity>
        </View>

        <SimpleLanguageSelector
          visible={showLanguageSelector}
          onClose={() => setShowLanguageSelector(false)}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#ffffffcc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  loginButton: {
    backgroundColor: "#91cfd0",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#f5a6a6",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  languageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 20,
  },
});
