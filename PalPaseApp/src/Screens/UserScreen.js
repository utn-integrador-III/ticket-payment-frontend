import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  Switch,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Picker } from "@react-native-picker/picker";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useSimpleLanguage } from "../hooks/useSimpleLanguage";
import SimpleLanguageSelector from "../components/SimpleLanguageSelector";

const fondoImage = require("../../assets/fondo.png");
const defaultAvatar = require("../../assets/profile-icon.png");

const themes = {
  light: { bg: "#ffffffcc", title: "#184e77" },
  dark: { bg: "#1c1c1ccc", title: "#ffffff" },
};

export default function UserScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { t, currentLanguage } = useSimpleLanguage();
  const theme = isDark ? themes.dark : themes.light;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 12345,
        name: "Juan Pérez",
        email: "juan@example.com",
        balance: 12000.5,
      };
      setUser(mockUser);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
  }, []);

  const requestPermission = async (permissionType) => {
    let permissionResult;
    if (permissionType === "camera") {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        `Se necesita permiso para acceder a la ${permissionType}.`
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermission("media library");
    if (!hasPermission) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      Alert.alert("Info", "Imagen actualizada");
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermission("camera");
    if (!hasPermission) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      Alert.alert("Info", "Foto tomada");
    }
    setModalVisible(false);
  };

  const confirmLogout = () => {
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.cancel'), style: "cancel" },
      { text: t('common.confirm'), onPress: () => navigation.replace("Login") },
    ]);
  };

  const showInDevelopment = () => {
    Alert.alert(t('common.info'), "Funcionalidad en desarrollo.");
  };

  const handleReloadBalance = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
      Alert.alert(t('common.info'), "Funcionalidad en desarrollo.");
    }, 2000);
  };

  const openWhatsApp = async () => {
    const message = "Hola, necesito ayuda con la app Pal Pase.";
    const url = `https://wa.me/50663363078?text=${encodeURIComponent(message)}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir WhatsApp.");
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.title} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={fondoImage} style={styles.background}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Animatable.Text
            animation="fadeInDown"
            style={[
              styles.welcomeText,
              { color: theme.title, fontFamily: "Poppins_700Bold" },
            ]}
          >
            {t.welcome}, {user.name.split(" ")[0]}!
          </Animatable.Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.avatarContainer}
          >
            <Image
              source={profileImage ? { uri: profileImage } : defaultAvatar}
              style={styles.avatar}
            />
            <Text
              style={[
                styles.editPhoto,
                { color: theme.title, fontFamily: "Poppins_400Regular" },
              ]}
            >
              {t.editPhoto}
            </Text>
          </TouchableOpacity>

          <View style={[styles.card, { backgroundColor: theme.bg }]}>
            <Text style={[styles.title, { color: theme.title }]}>
              {t('profile.profile')}
            </Text>

            <Text style={[styles.label, { color: theme.title }]}>
              ID: {user.id}
            </Text>
            <Text style={[styles.label, { color: theme.title }]}>
              {t('auth.email')}: {user.email}
            </Text>
            <Text style={[styles.label, { color: theme.title }]}>
              {t('home.balance')}: ₡{user.balance.toFixed(2)}
            </Text>

            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.title }]}>
                {t('settings.language')}:
              </Text>
              <TouchableOpacity
                style={styles.languageSelector}
                onPress={() => setShowLanguageSelector(true)}
              >
                <Text style={[styles.languageSelectorText, { color: theme.title }]}>
                  {currentLanguage === 'es' ? t('settings.spanish') : t('settings.english')} 🌐
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: theme.title }]}>
                {t.theme}:
              </Text>
              <Switch
                value={isDark}
                onValueChange={() => {
                  setIsDark(!isDark);
                  Alert.alert(
                    "Info",
                    `Tema cambiado a ${!isDark ? "oscuro" : "claro"}`
                  );
                }}
                thumbColor={isDark ? "#91cfd0" : "#f4f3f4"}
                trackColor={{ false: "#767577", true: "#91cfd0" }}
              />
            </View>

            <TouchableOpacity
              style={styles.reloadButton}
              onPress={handleReloadBalance}
              disabled={isReloading}
            >
              {isReloading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{t('home.recharge')}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={showInDevelopment}>
              <Text style={styles.buttonText}>{t('profile.personalInfo')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={showInDevelopment}>
              <Text style={styles.buttonText}>{t('profile.changePassword')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={confirmLogout}
            >
              <Text style={styles.logoutText}>{t('profile.logout')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.supportButton} onPress={openWhatsApp}>
          <Text style={styles.supportIcon}>?</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('common.edit')}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={pickImageFromGallery}
              >
                <Text style={styles.modalButtonText}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
                <Text style={styles.modalButtonText}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "#333" }]}>
                  {t('common.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <SimpleLanguageSelector
          visible={showLanguageSelector}
          onClose={() => setShowLanguageSelector(false)}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 20 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatarContainer: { alignItems: "center", marginVertical: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editPhoto: { fontSize: 14, marginTop: 5 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    fontFamily: "Poppins_700Bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#f97171",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#b33",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#91cfd0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#319",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  reloadButton: {
    backgroundColor: "#5bb1b1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#2a7f7f",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  section: { marginTop: 20 },
  supportButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#84d1f2",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  supportIcon: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#91cfd0",
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  languageSelector: {
    backgroundColor: 'rgba(145, 207, 208, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  languageSelectorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
