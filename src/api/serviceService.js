import axiosInstance from './axiosInstance';  // Assurez-vous que axiosInstance est correctement configuré

const serviceService = {
  // Récupérer la liste de tous les services
  getAllServices: async () => {
    try {
      const response = await axiosInstance.get('/services');  // URL API pour récupérer tous les services
      console.log(response.data)
      return response.data;
     
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      throw error;
    }
  },

  // Récupérer les services d'une catégorie spécifique
  getServicesByCategory: async (categorieId) => {
    try {
      const response = await axiosInstance.get(`/services/category/${categorieId}`);  // URL API pour récupérer les services d'une catégorie spécifique
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des services pour cette catégorie:', error);
      throw error;
    }
  },

  // Récupérer un service par ID
  getServiceById: async (id) => {
    try {
      const response = await axiosInstance.get(`/services/${id}`);  // URL API pour récupérer un service par ID
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du service:', error);
      throw error;
    }
  },

// Créer un nouveau service
createService: async (serviceData) => {
  try {
    const response = await axiosInstance.post('/services', serviceData); // URL API pour créer un service
    console.log('Service créé avec succès:', response.data); // Log des données reçues pour confirmation
    return response.data; // Retourne les données du service créé
  } catch (error) {
    // Gestion des erreurs
    if (error.response) {
      // Erreur renvoyée par le backend
      console.error('Erreur API:', error.response.data);
      throw new Error(error.response.data.error || 'Une erreur est survenue lors de la création du service.');
    } else if (error.request) {
      // Aucune réponse reçue (problème réseau ou backend inaccessible)
      console.error('Erreur réseau ou serveur non accessible:', error.request);
      throw new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');
    } else {
      // Autre erreur lors de la configuration de la requête
      console.error('Erreur inconnue:', error.message);
      throw new Error('Une erreur inconnue est survenue. Veuillez réessayer.');
    }
  }
},


  // Mettre à jour un service existant
  updateService: async (id, serviceData) => {
    try {
      const response = await axiosInstance.put(`/services/${id}`, {
        Titre: serviceData.Titre,
        Description: serviceData.Description,
        DateCreation: serviceData.DateCreation || null,
        categorie_id: serviceData.categorie_id,
    });

    console.log("Réponse du backend :", response.data);
} catch (error) {
    if (error.response) {
        console.error("Erreur du backend :", error.response.data.errors);
    } else {
        console.error("Erreur inconnue :", error);
    }
}
  },

  // Supprimer un service
  deleteService: async (id) => {
    try {
      const response = await axiosInstance.delete(`/services/${id}`);  // URL API pour supprimer un service
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du service:', error);
      throw error;
    }
  },

  getProfessionalsByService: async (serviceId) => {
    try {
      const response = await axiosInstance.get(`/services/${serviceId}/professionnels`);
        
      return response.data; // Retourner les données reçues
    } catch (error) {
      console.error('Erreur lors de la récupération des professionnels :', error.response?.data || error.message);
      throw error;
    }
  },
};

export default serviceService;
