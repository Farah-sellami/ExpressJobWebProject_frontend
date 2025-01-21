import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categorieService from "../../../api/categorieService";
import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";

function AddCategorieComponent() {
  const [categorie, setCategorie] = useState({
    Titre: "",
    Description: "",
    image: null, // Champ pour le fichier image
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  // Gestion des champs texte
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategorie({ ...categorie, [name]: value });
  };

  // Gestion du fichier image
  const handleFileChange = (e) => {
    setCategorie({ ...categorie, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Réinitialiser l'erreur

    // Vérification de l'existence du titre
    if (!categorie.Titre) {
      setError("Le titre existe déja !");
      return;
    }
    try {
      // Construction de FormData
      const formData = new FormData();
      formData.append("Titre", categorie.Titre);
      formData.append("Description", categorie.Description || "");
      if (categorie.image) {
        formData.append("image", categorie.image);
      }

      // Appel à l'API
      const response = await categorieService.createCategorie(formData);
      console.log('Réponse de l\'API : ', response);
      alert("Catégorie créée avec succès !");
      navigate("/ListCategories");
      
      // Réinitialise les champs
      setCategorie({ Titre: "", Description: "", image: null });
    } catch (error) {
      alert("Erreur lors de la création de la catégorie : " + error.message);
      // Gestion des erreurs
    const errorMessage = error.response?.data?.message || error.message || "Erreur inconnue";
    setError(`Erreur lors de la création de la catégorie : ${errorMessage}`);
    alert(`Erreur lors de la création de la catégorie : ${errorMessage}`);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <main className="main-content">
        <div className="position-relative iq-banner">
          <div className="iq-navbar-header" style={{ height: "215px" }}>
            <div className="container-fluid iq-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-wrap d-flex justify-content-between align-items-center">
                    <div>
                      <h1></h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="iq-header-img">
              <img
                src="../../assets/images/dashboard/top-header.png"
                alt="header"
                className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
              />
              {/* Autres images */}
            </div>
          </div>
        </div>
        <div className="conatiner-fluid content-inner mt-n5 py-0">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Ajout Catégorie</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Titre</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Titre"
                        name="Titre"
                        value={categorie.Titre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="Description"
                        value={categorie.Description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          setCategorie({ Titre: "", Description: "", image: null })
                        }
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </main>
    </>
  );
}

export default AddCategorieComponent;
