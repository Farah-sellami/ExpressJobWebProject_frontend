import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import categorieService from "../../../api/categorieService";
import { useNavigate } from 'react-router-dom';

function ListCategorieComponent() {
   const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage] = useState(5); // Nombre de catégories par page
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const handleDeleteClick = (categorie) => {
   setSelectedCategorie(categorie); // Stocker la catégorie sélectionnée
   setModalVisible(true); // Afficher le modal
 };

 const handleConfirmDelete = async () => {
   try {
     if (selectedCategorie) {
       await categorieService.deleteCategorie(selectedCategorie.id); // Supprimer la catégorie
       alert("Catégorie supprimée :", selectedCategorie.Titre)
       console.log("Catégorie supprimée :", selectedCategorie.Titre);
       setCategories(categories.filter(categorie => categorie.id !== selectedCategorie.id));     }
   } catch (error) {
     console.error("Erreur lors de la suppression :", error);
     alert("impossible de supprimer cette Catégorie :", selectedCategorie.Titre)
   } finally {
     setModalVisible(false); // Fermer le modal
     setSelectedCategorie(null); // Réinitialiser la catégorie sélectionnée
   }
 };

 const handleCancelDelete = () => {
   setModalVisible(false); // Fermer le modal
   setSelectedCategorie(null); // Réinitialiser la catégorie sélectionnée
 };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await categorieService.getAllCategories();
        setCategories(categoryData);
      } catch (error) {
        setError("Erreur lors de la récupération des catégories",error);
      }
    };
    fetchCategories();
  }, []);

  const indexOfLastCategorie = (currentPage + 1) * categoriesPerPage;
  const indexOfFirstCategorie = indexOfLastCategorie - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategorie,
    indexOfLastCategorie
  );

  const paginate = (selectedPage) => {
    setCurrentPage(selectedPage);
  };
   const navigate = useNavigate();
   const handleAddCategorie = () => {
     navigate('/AjoutCategorie'); 
   };
   const handleEditCategorie = (id) => {
      navigate(`/ModifierCategorie/${id}`); 
    };
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
                  <h4 className="card-title">Liste des categories</h4>
               </div>

               <div
      onClick={handleAddCategorie}
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
            {error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : currentCategories.length > 0 ? (
               <div className="table-responsive">
                  <table id="datatable" className="table table-striped" data-toggle="data-table">
                     <thead>
                        <tr>
                           <th>categorieID</th>
                           <th>Image</th>
                           <th>Titre</th>
                           <th>description</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentCategories.map((categorie) => (
                          <tr key={categorie.id}>
                            <td>{categorie.id}</td>
                            <td><img src={categorie.image} alt="Categorie" width="50" /></td>
                            <td>{categorie.Titre}</td>
                            <td>{categorie.Description}</td>
                            <td>
         
                            <button  onClick={() => handleEditCategorie(categorie.id)} className="btn btn-sm btn-icon" data-bs-placement="top" title="modifier">
                            <svg className="icon-32" width="32" viewBox="0 0 24 24" fill="#EBB531" xmlns="http://www.w3.org/2000/svg">                                
                                 <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="#EBB531">
                                 </path>                                
                                 <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="#EBB531">
                                 </path>                                
                                 <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="#EBB531">
                                 </path>                                
                              </svg> 
                              </button>

                              <button  onClick={() => handleDeleteClick(categorie)} className="btn btn-sm btn-icon" data-bs-placement="top" title="Supprimer">
                                <svg className="icon-32" width="32" fill="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path fill="red" opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"/>
                                  <path fill="red" d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"/>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                     <tfoot>
                        <tr>
                        <th>categorieID</th>
                        <th>Image</th>
                           <th>Titre</th>
                           <th>description</th>
                           <th>Actions</th>
                        </tr>
                     </tfoot>
                  </table>
               </div>
                ) : (
                  <p>Aucune catégorie disponible.</p>
                )}
            </div>
            
                   {/* Pagination */}
             <div className="d-flex justify-content-center mt-3">
                  <ReactPaginate
                    previousLabel={'Précédent'}
                    nextLabel={'Suivant'}
                    pageCount={Math.ceil(categories.length / categoriesPerPage)}
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
      

        {/* Modal de confirmation */}
        {isModalVisible && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Suppression d&apos;une catégorie</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete} />
              </div>
              <div className="modal-body">
                <p>
                  Vous êtes sûr de vouloir supprimer{" "}
                  <strong>{selectedCategorie?.title}</strong> ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmDelete}
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Annuler
                </button>
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


export default ListCategorieComponent
