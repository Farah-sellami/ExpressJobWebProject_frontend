import FooterAdmin from "../../../layout/FooterAdmin"
import NavbarAdmin from "../../../layout/NavbarAdmin"
import { useState, useEffect } from "react";
import serviceService from "../../../api/serviceService";
import categorieService from "../../../api/categorieService";
import { useNavigate, useParams } from "react-router-dom"; 


function EditServiceComponent() {
    const [categories, setCategories] = useState([]);
    const [serviceData, setServiceData] = useState({
        id: "",
        Titre: "",
        Description: "",
        categorie_id: "",
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { id } = useParams(); // Récupérer l'ID du service depuis l'URL
      console.log(id);
      const navigate = useNavigate();
      // eslint-disable-next-line no-unused-vars
      const [error, setError] = useState(null);

      // Charger le service à modifier
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await categorieService.getAllCategories();
            console.log(response)
            if (Array.isArray(response)) {
              setCategories(response);
            } else {
              setError("Aucune catégorie disponible.");
            }
          } catch (error) {
            setError("Erreur lors du chargement des catégories.");
            console.error("Erreur lors du chargement des catégories:", error);
          }
        };
    
        const fetchService = async () => {
          if (!id) {
            setError("ID de la service manquant.");
            return;
          }
          try {
            const response = await serviceService.getServiceById(id);
            if (response) {
              setServiceData({
                id: response.id,
                Titre: response.Titre,
                Description: response.Description,
                categorie_id: response.categorie_id,
              });
            } else {
              setError("service non trouvée.");
            }
          } catch (error) {
            setError("Erreur lors de la récupération de la service.");
            console.error(error);
          }
        };
        fetchService();
        fetchCategories();
      }, [id]);
    
      // Gestion de la modification du formulaire
      const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Soumettre les modifications du service
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
          await serviceService.updateService(serviceData.id, serviceData);
          alert("Service mis à jour avec succès !");
          navigate("/services"); // Rediriger vers la liste des services
        } catch (error) {
          console.error("Erreur lors de la mise à jour du service:", error);
          alert("Une erreur est survenue.");
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
           
          <div className="conatainer-fluid content-inner mt-n5 py-0">
       <div className="row">
          <div className="col-12">
             <div className="card">
                <div className="card-header d-flex justify-content-between">
                   <div className="header-title">
                      <h4 className="card-title">modifier service</h4>
                   </div>
                  
                </div>
    
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label">ID service</label>
                        <input type="text" className="form-control" 
                        value={serviceData.id} disabled />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Titre</label>
                        <input type="text" className="form-control"  
                        name="Titre"
                        value={serviceData.Titre}
                        onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" 
                         name="Description" 
                        value={serviceData.Description}
                        onChange={handleChange} />
                      </div>
                   
                      <div className="form-group">
                      <label className="form-label">Catégorie</label>
                      <select
                        name="categorie_id"
                        className="form-control"
                        
                        value={serviceData.categorie_id}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                              <option
                                key={category.categorie_id}
                                value={category.categorie_id}
                              >
                                {category.Titre}
                              </option>
                            ))
                          ) : (
                            <option>Aucune catégorie disponible</option>
                          )}
                        </select>
                    </div>
                      <div className="form-group">
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                      </button>
                  
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate("/services")}
                      >
                        Annuler</button>
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
    

export default EditServiceComponent
