# Docker Setup para PalPase Frontend

Este documento explica cómo ejecutar la aplicación React Native con Expo en un contenedor Docker y conectarla con Expo Go.

## Prerrequisitos

- Docker y Docker Compose instalados
- Expo Go app instalada en tu dispositivo móvil
- Dispositivo móvil y computadora en la misma red WiFi

## Instrucciones de Uso

### 1. Construir y ejecutar el contenedor

```bash
# Navegar al directorio del frontend
cd ticket-payment-frontend

# Construir y ejecutar el contenedor
docker-compose up --build
```

### 2. Conectar con Expo Go

Una vez que el contenedor esté ejecutándose:

1. **Busca la URL del túnel**: En los logs del contenedor verás algo como:
   ```
   › Metro waiting on exp://xxx-xxx.anonymous.exp.direct:80
   › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
   ```

2. **Escanea el código QR**: 
   - **Android**: Abre Expo Go y escanea el QR code
   - **iOS**: Usa la cámara del iPhone para escanear el QR code

3. **Alternativa manual**: Si el QR no funciona, puedes:
   - Copiar la URL `exp://xxx-xxx.anonymous.exp.direct:80`
   - Pegarla en Expo Go manualmente

### 3. Desarrollo en tiempo real

- Los cambios en el código se reflejarán automáticamente en la app
- El hot reload está habilitado
- Los logs aparecerán en la consola de Docker

### 4. Puertos expuestos

- `19000`: Expo DevTools
- `19001`: Metro Bundler
- `19002`: Metro Bundler (alternativo)
- `8081`: Metro Bundler HTTP

### 5. Comandos útiles

```bash
# Ver logs del contenedor
docker-compose logs -f

# Parar el contenedor
docker-compose down

# Reconstruir sin cache
docker-compose build --no-cache

# Ejecutar comandos dentro del contenedor
docker-compose exec palpase-frontend sh
```

## Solución de Problemas

### El QR code no funciona
- Asegúrate de que tu dispositivo y computadora están en la misma red
- Usa la opción de túnel que se muestra en los logs
- Intenta reiniciar el contenedor

### La app no se conecta
- Verifica que los puertos no estén bloqueados por firewall
- Asegúrate de que Expo Go esté actualizado
- Revisa los logs del contenedor para errores

### Cambios no se reflejan
- El hot reload puede tardar unos segundos
- Intenta hacer shake en el dispositivo y seleccionar "Reload"
- Verifica que el volumen esté montado correctamente

## Notas Importantes

- El contenedor usa túnel de Expo para acceso externo
- Los `node_modules` están optimizados con volumen anónimo
- La configuración permite desarrollo en tiempo real
- Compatible con Expo Go en Android e iOS
