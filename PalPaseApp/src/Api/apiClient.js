import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.100.8:8000/api", //cambia esta URL por la de tu servidor
  timeout: 10000, // Tiempo máximo de espera en milisegundos
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
