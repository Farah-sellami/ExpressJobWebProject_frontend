import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import categorieService from "../../../api/categorieService";
import serviceService from "../../../api/serviceService";
import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";
import { useNavigate } from 'react-router-dom';

function ListServicesComponent() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [servicesPerPage] = useState(5);  // Nombre de services par page
    const [categories, setCategories] = useState([]); // Liste des catégories
    const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée
    const [showModal, setShowModal] = useState(false); // État pour afficher ou cacher le modal
    const [showProfessionalModal, setShowProfessionalModal] = useState(false); 
    const [selectedService, setSelectedService] = useState(null); // État pour l'service sélectionné
    const [professionals, setProfessionals] = useState([]);
   
    const indexOfLastService = (currentPage + 1) * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  
  
    const handleServiceClick = (service) => {
      setSelectedService(service); // Stocke le service sélectionné
     setProfessionals(service.professionnels || []); // Met à jour les professionnels associés au service
     setShowProfessionalModal(true); // Ouvre la modal
   };
  
    const handleDeleteClick = (service) => {
      console.log('Service sélectionné:', service);
      setSelectedService(service); 
      setShowModal(true); // Affiche le modal
    };
  
    const handleCloseModal = () => {
      setShowModal(false); // Cache le modal
      setSelectedService(null); // Réinitialise l'service sélectionné
    };
  
    const handleConfirmDelete = async () => {
      console.log("ID du service à supprimer:", selectedService?.id);
      if (selectedService) {
        console.log("Suppression de service :", selectedService);
        try {
         
         await serviceService.deleteService(selectedService.id);
   
         // Mettre à jour l'interface utilisateur après la suppression
         setServices((prevServices) => prevServices.filter((service) => service.id !== selectedService.id));
        setShowModal(false);
        alert("service supprimé avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue.");
      }
    }
  };
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          // Remplir la liste des catégories (par exemple, depuis une API)
          // Ici, tu peux appeler une API pour récupérer les catégories
          const categoryData = await categorieService.getAllCategories(); // Assure-toi que cette méthode est définie dans ton service
          setCategories(categoryData);
        } catch (err) {
          setError('Error fetching categories',err);
        }
      };
  
      fetchCategories();
    }, []);
  
    const navigate = useNavigate();
    const handleAddService = () => {
      navigate('/AjoutService'); // Chemin vers votre composant AddService
    };
  
    const handleEditService = (id) => {
      navigate(`/ModifierService/${id}`); // Chemin vers votre composant AddService
    };
  
      useEffect(() => {
        const fetchServices = async () => {
          try {
            let data = [];
            if (selectedCategory) {
              // Si une catégorie est sélectionnée, on filtre par catégorie
              data = await serviceService.getServicesByCategory(selectedCategory);
            } else {
              // Sinon, on récupère tous les services
              data = await serviceService.getAllServices();
            }
            setServices(data);
            setLoading(false);
          } catch (err) {
            setError('Error fetching services',err);
            setLoading(false);
          }
        };
    
        fetchServices();
      }, [selectedCategory]); // Appeler quand la catégorie change
    
  
  
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <>
        <NavbarAdmin></NavbarAdmin>
        
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
                    <h4 className="card-title">Liste des services</h4>
                 </div>
                
                 <div
        onClick={handleAddService}
        style={{ cursor: 'pointer', display: 'inline-block' }}
        title="Ajouter un nouveau service"
      >
        <svg
          className="icon-32"
          width="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.33 2H16.66C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2ZM12.82 12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83Z"
            fill="green"
          />
        </svg>
      </div>
              </div>
              <div className="card-body">
                    <div className="mb-3">
                      {/* Sélecteur de catégorie */}
                      <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Toutes les catégories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.Titre}
                          </option>
                        ))}
                      </select>
                    </div>
                 <div className="table-responsive">
                    <table id="datatable" className="table table-striped" data-toggle="data-table">
                       <thead>
                          <tr>
                             <th>serviceID</th>
                             <th>Titre</th>
                             <th>Description</th>
                
                             <th>Categorie</th>
                             {/* <th>Professionnels</th> */}
                             <th>Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                          {currentServices.map(service => (
                            <tr key={service.id}>
                              <td>{service.id}</td>
                              <td>{service.Titre}</td>
                              <td>{service.Description}</td>
                              <td>{service.categorie ? service.categorie.Titre : 'Non défini'}</td>
                              {/* <td>
                                {service.professionnels && service.professionnels.length > 0 ? (
                                  service.professionnels.map((professional, index) => (
                                    <div key={index}>{professional.name}</div>
                                  ))
                                ) : (
                                  'Aucun professionnel'
                                )}
                              </td> */}
                              <td>
  
  
                                <div onClick={() => handleServiceClick(service)}
                                  style={{ cursor: 'pointer', display: 'inline-block' }}
                                  title="afficher professionnels">
                              <svg className="icon-32" width="32" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">                               
                               <path fill="#9AEAAA" opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M17.7366 6.04606C19.4439 7.36388 20.8976 9.29455 21.9415 11.7091C22.0195 11.8924 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8924 2.05854 11.7091C4.14634 6.87903 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12Z">
                              </path>                                
                              <path fill="#9AEAAA" d="M14.4308 11.997C14.4308 13.3255 13.3381 14.4115 12.0015 14.4115C10.6552 14.4115 9.5625 13.3255 9.5625 11.997C9.5625 11.8321 9.58201 11.678 9.61128 11.5228H9.66006C10.743 11.5228 11.621 10.6695 11.6601 9.60184C11.7674 9.58342 11.8845 9.57275 12.0015 9.57275C13.3381 9.57275 14.4308 10.6588 14.4308 11.997Z" >
                                </path>                             
                              </svg> 
                              </div>
  
  
                              <div
                                  onClick={() => handleEditService(service.id)}
                                  style={{ cursor: 'pointer', display: 'inline-block' }}
                                  title="modifier service"
                                >
                               <svg  className="icon-32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">                               
                                  <path fill="#E5A016 " opacity="0.4" d="M16.6643 21.9897H7.33488C5.88835 22.0796 4.46781 21.5781 3.3989 20.6011C2.4219 19.5312 1.92041 18.1107 2.01032 16.6652V7.33482C1.92041 5.88932 2.4209 4.46878 3.3979 3.39889C4.46781 2.42189 5.88835 1.92041 7.33488 2.01032H16.6643C18.1089 1.92041 19.5284 2.4209 20.5973 3.39789C21.5733 4.46878 22.0758 5.88832 21.9899 7.33482V16.6652C22.0788 18.1107 21.5783 19.5312 20.6013 20.6011C19.5314 21.5781 18.1109 22.0796 16.6643 21.9897Z" >
                                   </path>                                
                                  <path fill="#E5A016 " d="M17.0545 10.3976L10.5018 16.9829C10.161 17.3146 9.7131 17.5 9.24574 17.5H6.95762C6.83105 17.5 6.71421 17.4512 6.62658 17.3634C6.53895 17.2756 6.5 17.1585 6.5 17.0317L6.55842 14.7195C6.56816 14.261 6.75315 13.8317 7.07446 13.5098L11.7189 8.8561C11.7967 8.77805 11.9331 8.77805 12.011 8.8561L13.6399 10.4785C13.747 10.5849 13.9028 10.6541 14.0683 10.6541C14.4286 10.6541 14.7109 10.3615 14.7109 10.0102C14.7109 9.83463 14.6428 9.67854 14.5357 9.56146C14.5065 9.52244 12.9554 7.97805 12.9554 7.97805C12.858 7.88049 12.858 7.71463 12.9554 7.61707L13.6078 6.95366C14.2114 6.34878 15.1851 6.34878 15.7888 6.95366L17.0545 8.22195C17.6485 8.81707 17.6485 9.79268 17.0545 10.3976Z">
                                   </path>                            
                              </svg>   
  </                            div>
  
                              <button
                                      className="btn btn-sm btn-icon "
                                      data-bs-placement="top"
                                      title="Delete"
                                      onClick={() => handleDeleteClick(service)} // Gestion du clic
                                    >
                              <svg className="icon-32" width="32" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">                                
                                <path fill="red" opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" >
                                </path>                               
                                <path fill="red" d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z">
                                </path>                              
                              </svg>                            
                              </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                       <tfoot>
                          <tr>
                          <th>serviceID</th>
                            <th>Titre</th>
                            <th>Description</th>                            
                            <th>Catégorie</th>
                            <th>Actions</th>
                          </tr>
                       </tfoot>
                    </table>
                 </div>
              </div>
               {/* Pagination */}
               <div className="d-flex justify-content-center">
                    <ReactPaginate
                      previousLabel={'Précédent'}
                      nextLabel={'Suivant'}
                      pageCount={Math.ceil(services.length / servicesPerPage)}
                      onPageChange={({ selected }) => paginate(selected)}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      pageClassName={'page-item'}
                      pageLinkClassName={'page-link'}
                      previousClassName={'page-item'}
                      previousLinkClassName={'page-link'}
                      nextClassName={'page-item'}
                      nextLinkClassName={'page-link'}
                      disabledClassName={'disabled'}
                    />
             </div>
                </div>
              </div>
            </div>
          </div>
        
  
  
        
          {showModal && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Suppression d&apos;un service</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal} />
                </div>
                <div className="modal-body">
                  <p>
                    Vous êtes sûr de vouloir supprimer{" "}
                    <strong>{selectedService?.name}</strong> ?
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>
                    Confirmer
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
  
  
         {/* Modal pour afficher les professionnels */}
         {showProfessionalModal && selectedService && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Professionnels inscrit dans {selectedService.Titre}
                    </h5>
                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {professionals.length > 0 ? (
                      <ul className="list-group">
                        {professionals.map((professional) => (
                          <li key={professional.id} className="list-group-item">
                            <div>
                              <strong>{professional.firstName} {professional.lastName}</strong>
                              <p>{professional.address}</p>
                              <p>{professional.telephone}</p>
                              <img src={professional.photoProfile} alt="Profile" className="img-fluid" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucun professionnel disponible pour ce service.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )} 
        {/* <!-- Footer Section Start --> */}
      <FooterAdmin></FooterAdmin>
        {/* <!-- Footer Section End -->    */}
        </main>
  
        
      </>
    )
  }

export default ListServicesComponent
