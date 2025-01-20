import axiosInstance from './axiosInstance';  // Assurez-vous que axiosInstance est correctement configuré

const userService = {
  // Récupérer la liste de tous les utilisateurs (Admin uniquement)
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/user');  // URL API pour récupérer tous les utilisateurs
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

// Récupérer la liste des utilisateurs avec pagination et filtrage par rôle
getUsersWithPagination: async (perPage = 5, page = 1, role = '') => {
  try {
    const response = await axiosInstance.get('/users', {
      params: { 
        per_page: perPage, 
        page: page,  // Ajouter le paramètre 'page' pour la pagination
        role: role   // Ajouter le paramètre 'role' pour filtrer les utilisateurs
      }
    });

    // Vérifiez la réponse et retournez les données nécessaires
    return {
      users: response.data.users,
      totalPages: response.data.total_pages,
      currentPage: response.data.current_page,
      perPage: response.data.per_page,
      totalUsers: response.data.total_users
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs avec pagination:', error);
    throw error;
  }
},


  // Supprimer un utilisateur (Admin uniquement)
  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);  // URL API pour supprimer un utilisateur
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  },

  // Modifier le profil de l'utilisateur connecté
  updateProfile: async (profileData, userRole) => {
    try {
      const formData = new FormData();
  
      // Ajout des données de base
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('password', profileData.password); // Si le mot de passe est fourni
      formData.append('telephone', profileData.telephone);
      formData.append('adresse', profileData.adresse);
  
      // Ajout du fichier avatar (si présent)
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }
  
      // Ajouter les champs spécifiques aux professionnels si le rôle est professionnel
      if (userRole === 'professionnel') {
        formData.append('competence', profileData.competence);
        formData.append('available_hours', profileData.available_hours);
        formData.append('location', profileData.location);
        formData.append('service_id', profileData.service_id);
      }
  
      // Envoi de la requête PUT pour mettre à jour le profil
      const response = await axiosInstance.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data; // Retourne la réponse du serveur
  
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error; // Lancer l'erreur pour gérer côté frontend
    }
  },

  // Consulter le profil de l'utilisateur connecté
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/user');  // URL API pour récupérer le profil de l'utilisateur connecté
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  },

  // Supprimer le compte de l'utilisateur connecté
  deleteProfile: async () => {
    try {
      const response = await axiosInstance.delete('/users/profile');  // URL API pour supprimer le profil de l'utilisateur connecté
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du profil:', error);
      throw error;
    }
  },
// Fonction pour récupérer la liste des utilisateurs avec pagination, filtrée par rôle
 getUsersByRole : async (role) => 
  {
  try {
    const response = await axiosInstance.get('/usersByRole', {
      params: { role: role } // Passer le rôle dans les paramètres de la requête
    });
    return response.data; // Retourner les données des utilisateurs paginées
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs avec pagination:', error);
    throw error; // Rejeter l'erreur pour la gestion des erreurs en amont
  }
},

getCountProfessionnels : async () => {
  try {
      const response = await axiosInstance.get(`/count-professionnels`);
      return response.data.count_professionnels;
  } catch (error) {
      console.error("Erreur lors de la récupération du nombre de professionnels :", error);
      throw error;
  }
},

getCountClients : async () => {
  try {
      const response = await axiosInstance.get(`/count-clients`);
      return response.data.count_clients;
  } catch (error) {
      console.error("Erreur lors de la récupération du nombre de professionnels :", error);
      throw error;
  }
},
};

export default userService;
