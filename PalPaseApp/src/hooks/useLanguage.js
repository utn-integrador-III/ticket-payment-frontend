import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import i18n from '../localization';

const LANGUAGE_KEY = '@app_language';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
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
        // Si no hay idioma guardado, usar el del dispositivo de forma segura
        try {
          const locales = RNLocalize.getLocales();
          const deviceLanguage = locales && locales[0] ? locales[0].languageCode : 'es';
          const supportedLanguage = ['en', 'es'].includes(deviceLanguage) ? deviceLanguage : 'es';
          changeLanguage(supportedLanguage);
        } catch (localeError) {
          console.log('Error detecting device language, using Spanish');
          changeLanguage('es');
        }
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
      changeLanguage('es'); // Fallback a español
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (languageCode) => {
    try {
      i18n.locale = languageCode;
      setCurrentLanguage(languageCode);
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key, options = {}) => {
    return i18n.t(key, options);
  };

  const getSupportedLanguages = () => [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  return {
    currentLanguage,
    changeLanguage,
    t,
    getSupportedLanguages,
    isLoading
  };
};
