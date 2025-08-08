import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import es from './es.json';

const i18n = new I18n({
  en,
  es,
});

// Configurar el idioma por defecto
i18n.defaultLocale = 'es';
i18n.locale = 'es';
i18n.fallbacks = true;

// Detectar el idioma del dispositivo de forma más segura
try {
  const locales = RNLocalize.getLocales();
  const deviceLanguage = locales && locales[0] ? locales[0].languageCode : 'es';
  if (deviceLanguage === 'en' || deviceLanguage === 'es') {
    i18n.locale = deviceLanguage;
  }
} catch (error) {
  console.log('Error detecting device language, using default (es)');
  i18n.locale = 'es';
}

export default i18n;
