import Footer from "../../layout/Footer";
import NavbarClient from "../../layout/NavbarClient";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import demandeSService from "../../api/demandeSService";
import authService from "../../api/authService";

function GetDemandeServiceComponent() {
  const [demandes, setDemandes] = useState([]); // Nom corrigé pour la cohérence
  const [currentPage, setCurrentPage] = useState(0);
  const demandesPerPage = 6; // Nombre de demandes par page
  const [userRole, setUserRole] = useState(null); // Rôle de l'utilisateur (client ou professionnel)
  const [userId, setUserId] = useState(null); // ID de l'utilisateur connecté

  // Pagination
  const paginate = ({ selected }) => setCurrentPage(selected);

  useEffect(() => {
    // Récupérer le rôle et l'ID de l'utilisateur
    const fetchUserInfo = () => {
      try {
        const role = authService.getUserRole();
        const id = authService.getUserId();
        setUserRole(role);
        setUserId(id);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    // Charger toutes les demandes et filtrer selon le rôle
    if (userRole && userId) {
      const fetchDemandes = async () => {
        try {
          // Supposons que vous récupérez directement 'demandes' du backend
          const response = await demandeSService.consulterDemandes();
          const allDemandes = response.demandes; // Accès au tableau 'demandes'
  
          // Afficher la structure des données pour vérifier le format
          console.log('Réponse des demandes:', allDemandes);
  
          // Vérification si allDemandes est bien un tableau
          if (!Array.isArray(allDemandes)) {
            console.error('Les données des demandes ne sont pas un tableau.', allDemandes);
            return;
          }
  
          let filteredDemandes = [];
  
          // Filtrage des demandes en fonction du rôle de l'utilisateur
          if (userRole === "client") {
            filteredDemandes = allDemandes.filter(demande => demande.client.id === userId);
          } else if (userRole === "professionnel") {
            filteredDemandes = allDemandes.filter(demande => demande.professionnel.id === userId);
          } else if (userRole === "admin") {
            filteredDemandes = allDemandes;  // Admin peut voir toutes les demandes
          }
  
          // Affichage des demandes filtrées
          console.log('Demandes filtrées:', filteredDemandes);
  
          setDemandes(filteredDemandes);
        } catch (error) {
          console.error('Erreur lors du chargement des demandes:', error);
        }
      };
  
      fetchDemandes();
    }
  }, [userRole, userId]);
  
  const handleChangeStatut = async (demandeId, nouveauStatut) => {
    try {
      const response = await demandeSService.changerStatutDemande(demandeId, nouveauStatut);
      const updatedDemande = response.demande;
      setDemandes(demandes.map(demande => (demande.id === updatedDemande.id ? updatedDemande : demande)));
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };
  // Déterminer les données affichées pour la page actuelle
  const offset = currentPage * demandesPerPage;
  const currentDemandes = demandes.slice(offset, offset + demandesPerPage);

  return (
    <>
      <NavbarClient />
      <main className="main-content">
        <div className="position-relative iq-banner">
          <div className="iq-navbar-header" style={{ height: '215px' }}>
            <div className="container-fluid iq-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-wrap d-flex justify-content-between align-items-center">
                    <div>
                      <h1>Liste des demandes service</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="iq-header-img">
              <img src="../../assets/images/dashboard/top-header.png" alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
            </div>
          </div>
        </div>
        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Liste des demandes service</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="datatable" className="table table-striped" data-toggle="data-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Professionnel</th>
                          <th>Date demande</th>
                          <th>Statut</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDemandes.length > 0 ? (
                          currentDemandes.map((demande, index) => (
                            <tr key={index}>
                              <td>{demande.client?.name || 'N/A'}</td>
                              <td>{demande.professionnel?.name || 'N/A'}</td>
                              <td>{new Date(demande.DateExecution).toLocaleDateString()}</td>
                              <td>{demande.Statut}</td>
                              <td>
  {/* Bouton pour l'action avec SVG pour le statut terminé */}
  <button 
    onClick={() => handleChangeStatut('terminé')} 
    style={{ background: 'none', border: 'none', padding: 0 }}
    aria-label="Statut terminé"
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
        d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.091C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.091V7.92C2 4.38 4.28 2 7.67 2ZM11.43 14.99L16.18 10.24C16.52 9.9 16.52 9.35 16.18 9C15.84 8.66 15.28 8.66 14.94 9L10.81 13.13L9.06 11.38C8.72 11.04 8.16 11.04 7.82 11.38C7.48 11.72 7.48 12.27 7.82 12.62L10.2 14.99C10.37 15.16 10.59 15.24 10.81 15.24C11.04 15.24 11.26 15.16 11.43 14.99Z" 
        fill="GREEN"
      />
    </svg>
  </button>

  {/* Bouton pour l'action avec SVG pour le statut annulé */}
  <button 
    onClick={() => handleChangeStatut('annulé')} 
    style={{ background: 'none', border: 'none', padding: 0 }}
    aria-label="Statut annulé"
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
        d="M7.67 1.99927H16.34C19.73 1.99927 22 4.37927 22 7.91927V16.0903C22 19.6203 19.73 21.9993 16.34 21.9993H7.67C4.28 21.9993 2 19.6203 2 16.0903V7.91927C2 4.37927 4.28 1.99927 7.67 1.99927ZM15.01 14.9993C15.35 14.6603 15.35 14.1103 15.01 13.7703L13.23 11.9903L15.01 10.2093C15.35 9.87027 15.35 9.31027 15.01 8.97027C14.67 8.62927 14.12 8.62927 13.77 8.97027L12 10.7493L10.22 8.97027C9.87 8.62927 9.32 8.62927 8.98 8.97027C8.64 9.31027 8.64 9.87027 8.98 10.2093L10.76 11.9903L8.98 13.7603C8.64 14.1103 8.64 14.6603 8.98 14.9993C9.15 15.1693 9.38 15.2603 9.6 15.2603C9.83 15.2603 10.05 15.1693 10.22 14.9993L12 13.2303L13.78 14.9993C13.95 15.1803 14.17 15.2603 14.39 15.2603C14.62 15.2603 14.84 15.1693 15.01 14.9993Z" 
        fill="RED"
      />
    </svg>
  </button>
</td>

                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">Aucune demande à afficher</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                  <ReactPaginate
                    previousLabel={'Précédent'}
                    nextLabel={'Suivant'}
                    pageCount={Math.ceil(demandes.length / demandesPerPage)}
                    onPageChange={paginate}
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
        <Footer />
      </main>
    </>
  );
}

export default GetDemandeServiceComponent;
