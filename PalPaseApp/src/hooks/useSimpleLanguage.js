import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t, setLanguage, getCurrentLanguage, getSupportedLanguages } from '../Utils/i18n';

const LANGUAGE_KEY = '@app_language';

export const useSimpleLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
        changeLanguage(savedLanguage);
      } else {
        // Usar español por defecto
        changeLanguage('es');
      }
    } catch (error) {
      console.log('Error loading language, using Spanish');
      changeLanguage('es');
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      setLanguage(languageCode);
      setCurrentLanguage(languageCode);
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    getSupportedLanguages,
    isLoading
  };
};
