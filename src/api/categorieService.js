import axiosInstance from './axiosInstance';  // Assurez-vous que axiosInstance est correctement configuré

const categorieService = {
  // Récupérer la liste de toutes les catégories
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');  // URL API pour récupérer toutes les catégories
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  // Récupérer une catégorie par ID
  getCategorieById: async (id) => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);  // URL API pour récupérer une catégorie par ID
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
      throw error;
    }
  },

// Créer une nouvelle catégorie
createCategorie: async (categorieData, imageFile) => {
  try {
    // Construire un objet FormData pour inclure l'image et les données
    const formData = new FormData();
    formData.append('Titre', categorieData.Titre);
    formData.append('Description', categorieData.Description || '');
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Envoyer la requête POST avec FormData
    const response = await axiosInstance.post('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error.response?.data || error.message);
    throw error;
  }
},


// Mettre à jour une catégorie existante
updateCategorie: async (id, categorieData) => {
  try {
    const formData = new FormData();

    // Ajouter les champs à FormData
    if (categorieData.Titre) formData.append('Titre', categorieData.Titre);
    if (categorieData.Description) formData.append('Description', categorieData.Description);
    if (categorieData.image) formData.append('image', categorieData.image); // Ajout de l'image

    // Envoyer la requête PUT avec FormData
    const response = await axiosInstance.put(`/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Indique qu'il s'agit de données de formulaire
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
    throw error;
  }
},


  // Supprimer une catégorie
  deleteCategorie: async (id) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);  // URL API pour supprimer une catégorie
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      throw error;
    }
  },
};

export default categorieService;
