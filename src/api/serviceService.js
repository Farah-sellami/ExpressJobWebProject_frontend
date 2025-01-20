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
      const response = await axiosInstance.post('/services', serviceData);  // URL API pour créer un service
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
      throw error;
    }
  },

  // Mettre à jour un service existant
  updateService: async (id, serviceData) => {
    try {
      const response = await axiosInstance.put(`/services/${id}`, serviceData);  // URL API pour mettre à jour un service
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du service:', error);
      throw error;
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
