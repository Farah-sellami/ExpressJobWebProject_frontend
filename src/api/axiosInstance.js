import axios from "axios";

const API_URL = "http://localhost:8000/api"; // L'URL de ton backend Laravel

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour inclure le token JWT dans les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupérer le token stocké
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Ajouter le token dans l'en-tête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Gérer les erreurs de requête
  }
);

// Ajouter un intercepteur pour gérer les erreurs de réponse
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expiré ou invalide
      window.location.href = "/login"; // Redirection vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
