import { useEffect, useState } from 'react';
import userService from '../../api/userService';
import FooterAdmin from '../../layout/FooterAdmin';
import NavbarAdmin from '../../layout/NavbarAdmin';

function DashboardPage() {
 // const [totalDemandes, setTotalDemandes] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalProfessionals, setTotalProfessionals] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ totalClientsRes, totalProfessionalsRes] = await Promise.all([
          // Vous pouvez décommenter la ligne suivante si vous avez un service pour obtenir le total des demandes
          // demandeSerService.getTotalDemandeServiceCount(),
          userService.getCountClients(),
          userService.getCountProfessionnels(),
        ]);

        console.log('API Responses:', {  totalClientsRes, totalProfessionalsRes });

    //    setTotalDemandes(totalDemandesRes); // Définir les données pour les demandes
        setTotalClients(totalClientsRes); // Définir les données pour les clients
        setTotalProfessionals(totalProfessionalsRes); // Définir les données pour les professionnels
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Une erreur est survenue lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="main-content">
      {/* Navbar */}
      <NavbarAdmin />

      <div className="container-fluid content-inner pb-0">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
              
              {/* Carte Professionnels */}
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="bg-primary-subtle rounded p-3">
                        <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <h2 className="counter" style={{ visibility: 'visible' }}>
                          {totalProfessionals !== null ? totalProfessionals : 'N/A'}
                        </h2>
                        Professionnels
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Clients */}
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="bg-info-subtle rounded p-3">
                        <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <h2 className="counter" style={{ visibility: 'visible' }}>
                          {totalClients !== null ? totalClients : 'N/A'}
                        </h2>
                        Clients
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Demandes de Service */}
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="bg-warning-subtle rounded p-3">
                        <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-end">
                        <h2 className="counter" style={{ visibility: 'visible' }}>
                          {/* {totalDemandes !== null ? totalDemandes.totalCount : 'N/A'} */}
                        </h2>
                        {/* Demandes de Service */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterAdmin />
    </main>
  );
}

export default DashboardPage;
