import { useState, useEffect } from 'react';
import NavbarClient from "../../layout/NavbarClient";
import FooterAdmin from "../../layout/FooterAdmin";
import serviceService from '../../api/serviceService';
import categorieService from '../../api/categorieService';
import { useNavigate } from 'react-router-dom';


function ServiceComponent() {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
  
  
    const navigate = useNavigate(); 
    
    const handleServiceClick = (service) => {
      navigate(`/professionnelsByService/${service.id}`);
    };
    
    const fetchCategories = async () => {
      try {
        const response = await categorieService.getAllCategories();
        setCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
  
    // Fonction pour récupérer les services par catégorie
    const fetchServices = async (categoryId) => {
      try {
        const response = await serviceService.getServicesByCategory(categoryId);
        setServices((prevServices) => ({
          ...prevServices,
          [categoryId]: response || [], // Stocker les services de cette catégorie
        }));
      } catch (error) {
        console.error(`Erreur lors de la récupération des services pour la catégorie ${categoryId}`, error);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    useEffect(() => {
      if (categories.length > 0) {
        categories.forEach(category => {
          fetchServices(category.id); // Récupérer les services pour chaque catégorie
        });
        setLoading(false); // Marquez la fin du chargement ici
      }
    }, [categories]);
    
    // Si les données sont en cours de chargement
    if (loading  || categories.length === 0) {
      return <p>Chargement des catégories et services...</p>;
    }
  
    return (
      <>
        <NavbarClient />
     
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
          
          <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row">
          {categories.map((category) => (
            <div className="col-lg-4 mb-4" key={category.id}>
              <div className="card">
  
  
                <div className="card-header" style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
                <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                <div className="p-2 rounded  disabled">
  
                <img
          src={category.image}
          alt="Services Icon"
          style={{ width: '40px', height: '40px' }}
        />
                </div>
                  <h4 className="px-3 fw-bold">{category.Titre}</h4>
                </div>
                </div>
                </div>
  
  
  
                <div className="card-body">
                  <p>{category.description}</p>
                  <ul className="list-group">
                    {/* Afficher les services associés à cette catégorie */}
                    {services[category.id] && services[category.id].length > 0 ? (
                      services[category.id].map((service) => (
                        <li key={`${category.id}-${service.id}`} className="list-group-item">
                          <a  className="custom-link" onClick={() => handleServiceClick(service)}>
                            {service.Titre}
                          </a>
                        </li>
                      ))
                    ) : (
                      <p>Aucun service disponible pour cette catégorie.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          <FooterAdmin />
        </main>
      </>
    );
  }
export default ServiceComponent
