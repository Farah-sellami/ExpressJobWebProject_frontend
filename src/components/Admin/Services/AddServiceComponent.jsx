import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categorieService from "../../../api/categorieService";
import serviceService from "../../../api/serviceService";
import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";


function AddServiceComponent() {
    const [formData, setFormData] = useState({
        Titre: "",
        Description: "",
        categorie_id: "",
      });
      const [categories, setCategories] = useState([]);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate(); // Hook pour naviguer
      // Charger les catégories au montage du composant
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const data = await categorieService.getAllCategories();
            setCategories(data);
          } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
          }
        };
        fetchCategories();
      }, []);
    
      // Gérer les changements dans le formulaire
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Gérer la soumission du formulaire
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const serviceData = {
            ...formData,
            categorie_id: parseInt(formData.categorie_id, 10),
          };
          const response = await serviceService.createService(serviceData);
          console.log("Service créé avec succès :", response);
          alert("Le service a été créé avec succès !");
          navigate("/ListServices"); // Redirige vers la page des services
          setFormData({
            Titre: "",
            Description: "",
            categorie_id: "",
          });
        } catch (error) {
          console.error("Erreur lors de la création du service :", error);
          alert("Une erreur est survenue lors de la création du service.");
        } finally {
          setIsSubmitting(false);
        }
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
                      <h4 className="card-title">Ajout service</h4>
                   </div>
                  
                </div>
    
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label">Titre</label>
                        <input
                            type="text"
                            name="Titre"
                            className="form-control"
                            placeholder="Titre"
                            value={formData.Titre}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <input
                            type="text"
                            name="Description"
                            className="form-control"
                            placeholder="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            required
                          />
                        </div>
                     
                        <div className="form-group">
                          <label className="form-label">Catégorie</label>
                          <select
                            name="categorie_id"
                            className="form-control"
                            value={formData.categorie_id}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map((category) => (
                              <option key={category.categorie_id} value={category.id}>
                                {category.Titre}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                          </button>
                        
                          <button
                            type="reset"
                            className="btn btn-danger"
                            onClick={() =>
                              setFormData({ Titre: "", Description: "", categorie_id: "" })
                              
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
          
          {/* <!-- Footer Section Start --> */}
        <FooterAdmin></FooterAdmin>
          {/* <!-- Footer Section End -->    */}
          </main>
    
          
        </>
      )
    }
export default AddServiceComponent
