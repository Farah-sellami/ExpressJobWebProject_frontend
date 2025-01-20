import axiosInstance from './axiosInstance';  // Assurez-vous que axiosInstance est correctement configuré

const demandeService = {
// Envoyer une demande à un professionnel spécifique
envoyerDemande: async (professionnelId) => {
  try {
    const response = await axiosInstance.post('/demandes/envoyer', {
      professionnel_id: professionnelId
    });  // URL API pour envoyer une demande de service
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande:', error);
    throw error;
  }
},

  // Modifier le statut d'une demande (confirmée, refusée, etc.)
  changerStatutDemande: async (demandeId, nouveauStatut) => {
    try {
      const response = await axiosInstance.put(`/demandes/${demandeId}/statut/${nouveauStatut}`);  // URL API pour changer le statut d'une demande
      return response.data;
    } catch (error) {
      console.error('Erreur lors du changement de statut de la demande:', error);
      throw error;
    }
  },

  // Consulter les demandes de service en fonction du rôle de l'utilisateur
  consulterDemandes: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log("Utilisateur récupéré:", user);
      if (!user.role) {
        throw new Error("Rôle manquant dans les données de l'utilisateur");
      }
  
      // Vérifiez si le rôle est correct
      console.log("Rôle de l'utilisateur:", user.role);
  
      const response = await axiosInstance.get('/demandes');  // URL API pour consulter les demandes

    return response.data;  // Retourne les données des demandes
  } catch (error) {
    console.error('Erreur lors de la consultation des demandes:', error);
    throw error;  // Propagation de l'erreur
  }

  },

  // Récupérer les notifications de l'utilisateur connecté
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get('/notifications');  // URL API pour récupérer les notifications
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  },
};

export default demandeService;
