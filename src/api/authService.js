import axiosInstance from './axiosInstance';
//import jwt_decode from 'jwt-decode';

const authService = {
  // Inscription de l'utilisateur
  register: async (userData) => {
    console.log("Tentative d'inscription avec les données:", userData);
    try {
      const response = await axiosInstance.post('/register', userData);
      console.log("Réponse de l'inscription:", response);
    
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error.response?.data || error;
    }
  },

  // Connexion de l'utilisateur
  login: async (credentials) => {
    console.log("Tentative de connexion avec les identifiants:", credentials);
    try {
      const response = await axiosInstance.post('/login', credentials);
      console.log("Réponse de la connexion:", response);

      const { access_token, expires_in, user } = response.data;

      if (access_token) {
        console.log("Token reçu lors de la connexion:", access_token);
        // Stocker le token et les informations de l'utilisateur
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('expiresOn', Date.now() + expires_in * 1000);
        
        console.log("Informations utilisateur stockées:", user);
        return {
          success: true,
          token: access_token,
          user,  // L'utilisateur avec toutes ses informations
          expiresOn: Date.now() + expires_in * 1000,
        };
      }
      return { success: false, message: 'Problème de connexion' };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error.response?.data?.message || 'Erreur serveur';
    }
  },

  // Vérifie si le token est expiré
  isTokenExpired: () => {
    const token = localStorage.getItem('token');
    console.log("Vérification de l'expiration du token:", token);
    if (!token) return true;

    try {
      //const decoded = jwt_decode(token);  // Utilisation de jwt-decode
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log("Token décodé:", decoded);
      return decoded.exp * 1000 <= Date.now(); // Comparaison avec l'heure actuelle
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return true;
    }
  },

  // Déconnexion de l'utilisateur
  logout: () => {
    console.log("Déconnexion de l'utilisateur...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresOn');
  },

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    console.log("Vérification de l'authentification - token trouvé:", token);
    return token && !authService.isTokenExpired();
  },

  // Récupère le rôle de l'utilisateur
  getUserRole: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Récupération du rôle de l'utilisateur:", user.role);
    return user.role || null;
  },

  // Récupère l'ID de l'utilisateur
  getUserId: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Récupération de l'ID de l'utilisateur:", user.id);
    return user.id || null;
  },
};

export default authService;
