import FooterAdmin from "../../../layout/FooterAdmin" 
import NavbarAdmin from "../../../layout/NavbarAdmin"
import { useEffect, useState } from 'react';
import userService from "../../../api/userService";
import ReactPaginate from "react-paginate";


function ListUsersComponent() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // État pour l'utilisateur sélectionné
    const [showModal, setShowModal] = useState(false); // État pour afficher ou cacher le modal
    const [currentPage, setCurrentPage] = useState(0); // Page actuelle
    const [totalPages, setTotalPages] = useState(0); // Nombre de pages totales
    const [usersPerPage] = useState(5); // Nombre d'utilisateurs par page
    const [selectedRole, setSelectedRole] = useState(""); // État pour le rôle sélectionné

    useEffect(() => {
       const fetchUsers = async () => {
         try {
           const usersData = await userService.getUsersWithPagination(usersPerPage, currentPage + 1, selectedRole);
           console.log("Users fetched:", usersData);
           setUsers(usersData.users);  // Utilisez la réponse des utilisateurs
           setTotalPages(usersData.totalPages);  
         } catch (err) {
           setError("Erreur lors du chargement des utilisateurs.", err);
         } finally {
           setLoading(false);
         }
       };
   
       fetchUsers();
     }, [currentPage, usersPerPage, selectedRole]); // Ajoutez selectedRole à la dépendance

     const handleDeleteClick = (user) => {
       setSelectedUser(user); // Met à jour l'utilisateur sélectionné
       setShowModal(true); // Affiche le modal
     };
   
     const handleCloseModal = () => {
       setShowModal(false); // Cache le modal
       setSelectedUser(null); // Réinitialise l'utilisateur sélectionné
     };
   
     const handleConfirmDelete = async () => {
       if (selectedUser) {
         console.log("Suppression de l'utilisateur :", selectedUser);
         try {
           await userService.deleteUser(selectedUser.id);
           setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
           setShowModal(false);
           alert("Utilisateur supprimé avec succès !");
         } catch (error) {
           console.error("Erreur lors de la suppression :", error);
           alert("Une erreur est survenue.");
         }
       }
     };

     const indexOfFirstUser = currentPage * usersPerPage;
     const currentUsers = users.slice(indexOfFirstUser, indexOfFirstUser + usersPerPage);
 
     const handlePageChange = ({ selected }) => {
       setCurrentPage(selected);
     };

     const handleRoleChange = (event) => {
       setSelectedRole(event.target.value); // Met à jour le rôle sélectionné
       setCurrentPage(0); // Réinitialiser à la première page lors du changement de rôle
     };
 
     if (loading) {
       return <p>Chargement des utilisateurs...</p>;
     }
   
     if (error) {
       return <p>{error}</p>;
     }

    return (
      <>
        <NavbarAdmin/>
        <br />
        <div className="container-fluid content-inner mt-n5 py-0">
          <div>
            <div className="row">
               <div className="col-sm-12">
                  <div className="card">
                     <div className="card-header d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title"> Liste des utilisateurs </h4>
                        </div>
                        {/* Ajout du filtre par rôle */}
                        <select 
                          className="form-select w-auto" 
                          value={selectedRole} 
                          onChange={handleRoleChange}
                        >
                          <option value="">Tous les rôles</option>
                          <option value="admin">Administrateur</option>
                          <option value="professionnel">Professionnels</option>
                          <option value="client">Clients</option>
                        </select>
                     </div>
                     <div className="card-body px-0">
                        <div className="table-responsive">
                           <table id="user-list-table" className="table table-striped" role="grid">
                              <thead>
                                 <tr className="ligth">
                                    <th>Photo de Profil</th>
                                    <th>Nom et Prénom</th>
                                    <th>Email</th>
                                    <th>Adresse</th>
                                    <th>Téléphone</th>
                                    <th>Rôle</th>
                                    <th style={{ minWidth: '100px'}}>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                {currentUsers.length > 0 ? (
                                  currentUsers.map((user) => (
                                     <tr key={user.id}>
                                        <td className="text-center">
                                           {user.avatar ? (
                                              <img src={user.avatar} className="bg-primary-subtle rounded img-fluid avatar-40 me-3" alt="profile" />
                                           ) : (
                                              'Pas de photo'
                                           )}
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.adresse}</td>
                                        <td>{user.telephone}</td>
                                        <td>{user.role ? user.role : 'No role'}</td>
                                        <td>
                                          <div className="flex align-items-center list-user-action">
                                            <button
                                              className="btn btn-sm btn-icon btn-danger"
                                              title="Delete"
                                              onClick={() => handleDeleteClick(user)}
                                            >
                                              <span className="btn-inner">
                                              <svg
                                         className="icon-20"
                                         width="20"
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         stroke="currentColor"
                                       >
                                         <path
                                           d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                           stroke="currentColor"
                                           strokeWidth="1.5"
                                           strokeLinecap="round"
                                           strokeLinejoin="round"
                                         />
                                         <path
                                           d="M20.708 6.23975H3.75"
                                           stroke="currentColor"
                                           strokeWidth="1.5"
                                           strokeLinecap="round"
                                           strokeLinejoin="round"
                                         />
                                         <path
                                           d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                           stroke="currentColor"
                                           strokeWidth="1.5"
                                           strokeLinecap="round"
                                           strokeLinejoin="round"
                                         />
                                       </svg>
  
                                              </span>
                                            </button>
                                          </div>
                                        </td>
                                     </tr>
                                  ))
                                ) : (
                                  <tr>
                                     <td colSpan="7" className="text-center">Aucun utilisateur trouvé</td>
                                  </tr>
                                )}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-center">
               <ReactPaginate
                 previousLabel={"Précédent"}
                 nextLabel={"Suivant"}
                 pageCount={totalPages}
                 onPageChange={handlePageChange}
                 containerClassName={"pagination"}
                 activeClassName={"active"}
                 pageClassName={"page-item"}
                 pageLinkClassName={"page-link"}
                 previousClassName={"page-item"}
                 previousLinkClassName={"page-link"}
                 nextClassName={"page-item"}
                 nextLinkClassName={"page-link"}
                 disabledClassName={"disabled"}
               />
            </div>
         </div>
       </div>
       {/* Modal pour la suppression */}
       {showModal && (
         <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
           <div className="modal-dialog">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Suppression d&apos;un utilisateur</h5>
                 <button type="button" className="btn-close" onClick={handleCloseModal} />
               </div>
               <div className="modal-body">
                 <p>
                   Vous êtes sûr de vouloir supprimer{" "}
                   <strong>{selectedUser?.name} </strong> ?
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
       <FooterAdmin />
     </>
   );
}

export default ListUsersComponent;
