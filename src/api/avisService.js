import axiosInstance from './axiosInstance';  // Assurez-vous que axiosInstance est correctement configuré

const avisService = {
  // Récupérer la liste de tous les avis
  getAllAvis: async () => {
    try {
      const response = await axiosInstance.get('/avis');  // URL API pour récupérer tous les avis
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      throw error;
    }
  },

  // Récupérer un avis par ID
  getAvisById: async (id) => {
    try {
      const response = await axiosInstance.get(`/avis/${id}`);  // URL API pour récupérer un avis par ID
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'avis:', error);
      throw error;
    }
  },

  // Créer un nouvel avis
  createAvis: async (avisData) => {
    try {
      const response = await axiosInstance.post('/avis', avisData);  // URL API pour créer un avis
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'avis:', error);
      throw error;
    }
  },

  // Mettre à jour un avis existant
  updateAvis: async (id, avisData) => {
    try {
      const response = await axiosInstance.put(`/avis/${id}`, avisData);  // URL API pour mettre à jour un avis
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avis:', error);
      throw error;
    }
  },

  // Supprimer un avis
  deleteAvis: async (id) => {
    try {
      const response = await axiosInstance.delete(`/avis/${id}`);  // URL API pour supprimer un avis
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'avis:', error);
      throw error;
    }
  },
};

export default avisService;
