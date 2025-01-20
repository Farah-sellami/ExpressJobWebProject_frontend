import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import demandeSService from "../../api/demandeSService";
import serviceService from "../../api/serviceService";
import FooterAdmin from "../../layout/FooterAdmin";
import NavbarClient from "../../layout/NavbarClient";

function ListProByServiceComponent() {
  const { serviceID } = useParams(); // Récupérer l'ID du service de l'URL
  const [professionnels, setProfessionnels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const envoyerDemande = async (professionnelId) => {
    try {
      const response = await demandeSService.envoyerDemande(professionnelId);
      alert(`Demande envoyée avec succès à ${professionnelId}`);
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
      alert("Une erreur s'est produite lors de l'envoi de la demande.");
    }
  };

  useEffect(() => {
    const fetchProfessionnels = async () => {
      try {
        const response = await serviceService.getProfessionalsByService(serviceID);
        setProfessionnels(Array.isArray(response.professionnels) ? response.professionnels : []);
        } catch (err) {
        console.error("Erreur lors de la récupération des professionnels:", err);
        setError("Une erreur s'est produite lors du chargement des professionnels.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionnels();
  }, [serviceID]);

  if (loading) {
    return <p>Chargement des professionnels...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <NavbarClient />
      <main className="main-content">
        <div className="position-relative iq-banner">
          <div className="iq-navbar-header" style={{ height: "215px" }}>
            <div className="container-fluid iq-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-wrap d-flex justify-content-between align-items-center">
                    <div>
                      <h1>Les professionnels disponibles</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="iq-header-img">
              <img
                src="../../assets/images/dashboard/top-header.png"
                alt="header"
                className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
              />
              <img
                src="../../assets/images/dashboard/top-header1.png"
                alt="header"
                className="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"
              />
              <img
                src="../../assets/images/dashboard/top-header2.png"
                alt="header"
                className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX"
              />
              <img
                src="../../assets/images/dashboard/top-header3.png"
                alt="header"
                className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX"
              />
              <img
                src="../../assets/images/dashboard/top-header4.png"
                alt="header"
                className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX"
              />
              <img
                src="../../assets/images/dashboard/top-header5.png"
                alt="header"
                className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX"
              />
            </div>
          </div>
        </div>

        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row">
            {professionnels.length > 0 ? (
              professionnels.map((professional) => (
                <div className="col-md-4 mb-4" key={professional.id}>
                  <div className="card">
                    <div className="card-body text-center">
                    <img
                src={professional.avatar}
                alt={professional.name}
                className="img-fluid rounded-circle mb-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
                      <h3>{professional.name}</h3>
                      <p className="text-muted">{professional.telephone}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => envoyerDemande(professional.id)}                     >
                        Envoyer une demande
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun professionnel trouvé pour ce service.</p>
            )}
          </div>
        </div>
      </main>
      <FooterAdmin />
    </>
  );
}

export default ListProByServiceComponent;
