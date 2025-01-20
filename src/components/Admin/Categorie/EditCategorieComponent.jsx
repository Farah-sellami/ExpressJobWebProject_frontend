import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categorieService from "../../../api/categorieService";

function EditCategorieComponent() {
    const [categorie, setCategorie] = useState({
        id: '',
        Titre: '',
        Description: '',
        image : null
      });
      const [previewImage, setPreviewImage] = useState(null); 
      const [error, setError] = useState(null);
      const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
      console.log(id);
      const navigate = useNavigate();
      
      // Gestion du téléchargement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategorie((prevCategorie) => ({
        ...prevCategorie,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file)); // Prévisualisation de l'image téléchargée
    }
  };
      // Utilisation de useEffect pour récupérer les données de la catégorie à éditer
      useEffect(() => {
        const fetchCategorie = async () => {
            if (!id) {
                setError("ID de la catégorie manquant.");
                return;
              }
          try {
            const categoryData = await categorieService.getCategorieById(id);
            if (categoryData) {
                setCategorie({
                id: categoryData.id,
                Titre : categoryData.Titre,
                Description: categoryData.Description,
                image : categoryData.image,
                });
              } else {
                setError("Catégorie non trouvée.");
              }
            } catch (error) {
              setError("Erreur lors de la récupération de la catégorie.");
              console.error(error);
            }
          };
        fetchCategorie();
      }, [id]);
    
      // Fonction pour mettre à jour la catégorie
      const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
    
        try {
          await categorieService.updateCategorie(categorie.id, categorie); // Appel PUT
          navigate("/ListCategories"); // Redirige vers la page des catégories après la mise à jour
        } catch (error) {
          setError("Erreur lors de la mise à jour de la catégorie.");
          console.error(error);
        }
      };
    
      // Gestion de l'input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCategorie((prevCategorie) => ({
          ...prevCategorie,
          [name]: value,
        }));
      };
    return (
        <>
      <NavbarAdmin/>
      <main className="main-content">
          <div className="position-relative iq-banner">
              {/* <!-- Nav Header Component Start --> */}
              <div className="iq-navbar-header" style={{height: '215px'}}>
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
                      <img src="../../assets/images/dashboard/top-header.png" alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"/>
                      <img src="../../assets/images/dashboard/top-header1.png" alt="header" className="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"/>
                      <img src="../../assets/images/dashboard/top-header2.png" alt="header" className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX"/>
                      <img src="../../assets/images/dashboard/top-header3.png" alt="header" className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX"/>
                      <img src="../../assets/images/dashboard/top-header4.png" alt="header" className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX"/>
                      <img src="../../assets/images/dashboard/top-header5.png" alt="header" className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX"/>
                  </div>
              </div>          
               </div>    
              {/* <!-- Nav Header Component End --> */}
           
          <div className="conatiner-fluid content-inner mt-n5 py-0">
       <div className="row">
          <div className="col-12">
             <div className="card">
                <div className="card-header d-flex justify-content-between">
                   <div className="header-title">
                      <h4 className="card-title">Modifier Categorie</h4>
                   </div>
                  
                </div>
    
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="form-group">
                      <label className="form-label">ID de catégorie</label>
                      <input
                        type="text"
                        className="form-control"
                        value={categorie.id}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Titre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Titre"
                        value={categorie.Titre}
                        onChange={handleChange}
                        placeholder="Titre de la catégorie"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Description"
                        value={categorie.Description}
                        onChange={handleChange}
                        placeholder="Description de la catégorie"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    {previewImage && (
                      <div className="form-group">
                        <img
                          src={previewImage}
                          alt="Prévisualisation"
                          style={{ width: '100px', height: '100px', marginTop: '10px' }}
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate("/categories")}
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
          
          {/* <!-- Footer Section Start --> */}
        <FooterAdmin></FooterAdmin>
          {/* <!-- Footer Section End -->    */}
          </main>
    
          
        </>
      )
    }
    

export default EditCategorieComponent
