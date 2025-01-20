import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from 'react';
import demandeSService from "../../../api/demandeSService";

function ListDemandeServiceComponent() {
  const [demandeservices, setDemandeservices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const demandeservicesPerPage = 6; // Nombre de demandes par page

  // Pagination
  const paginate = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    // Charger les demandes services
    const fetchDemandeservices = async () => {
      try {
        const data = await demandeSService.consulterDemandes();
        setDemandeservices(data.demandes); // Assurez-vous que 'data.demandes' correspond à la structure de la réponse du backend
      } catch (error) {
        console.error("Erreur lors du chargement des demandes services :", error);
      }
    };
    fetchDemandeservices();
  }, []);

  // Déterminer les données affichées pour la page actuelle
  const offset = currentPage * demandeservicesPerPage;
  const currentDemandeservices = demandeservices.slice(
    offset,
    offset + demandeservicesPerPage
  );

  return (
    <>
      <NavbarAdmin />

      <main className="main-content">
        <div className="position-relative iq-banner">
          {/* Nav Header Component Start */}
          <div className="iq-navbar-header" style={{ height: '215px' }}>
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
              <img src="../../assets/images/dashboard/top-header.png" alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
              <img src="../../assets/images/dashboard/top-header1.png" alt="header" className="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX" />
              <img src="../../assets/images/dashboard/top-header2.png" alt="header" className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX" />
              <img src="../../assets/images/dashboard/top-header3.png" alt="header" className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX" />
              <img src="../../assets/images/dashboard/top-header4.png" alt="header" className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX" />
              <img src="../../assets/images/dashboard/top-header5.png" alt="header" className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX" />
            </div>
          </div>
          {/* Nav Header Component End */}
        </div>

        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Liste des demandes service</h4>
                  </div>
                  <div>
                    {/* Vous pouvez ajouter des actions supplémentaires ici */}
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
                        </tr>
                      </thead>
                      <tbody>
                        {currentDemandeservices.map((demande, index) => (
                          <tr key={index}>
                            <td>{demande.client.name}</td>
                            <td>{demande.professionnel.name}</td>
                            <td>{new Date(demande.DateExecution).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Client</th>
                          <th>Professionnel</th>
                          <th>Date demande</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                  <ReactPaginate
                    previousLabel={'Précédent'}
                    nextLabel={'Suivant'}
                    pageCount={Math.ceil(demandeservices.length / demandeservicesPerPage)}
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

        {/* Footer Section Start */}
        <FooterAdmin />
        {/* Footer Section End */}
      </main>
    </>
  );
}

export default ListDemandeServiceComponent;
