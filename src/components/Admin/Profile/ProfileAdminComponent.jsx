
import { useEffect, useState } from 'react';
import userService from "../../../api/userService";
import FooterAdmin from "../../../layout/FooterAdmin";
import NavbarAdmin from "../../../layout/NavbarAdmin";

function ProfileAdminComponent() {
 // Déclaration des états pour les informations utilisateur
 const [userData, setUserData] = useState({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
  adresse: '',
  telephone: '',
  avatar: null,
  competence : '',
  available_hours : '',
  note_moyenne : '',
  location : '',
  service_id: '',
  });

  useEffect(() => {
    // Appeler l'API pour récupérer les informations du profil
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile(); // Appeler la fonction getProfile depuis le service
        console.log(data); 
        setUserData({
          name: data.name,
          email: data.email,
          adresse: data.adresse,
          telephone: data.telephone,
          avatar: data.avatar,
          role: data.role,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, []);
 

  // Fonction pour gérer la soumission du formulaire pour update
  const handleSubmit = async (event) => {
    event.preventDefault();  // Empêche le rechargement de la page
    try {
      const updatedUserData = {
        name: userData.name,
        adresse: userData.adresse,
        telephone: userData.telephone,
        email: userData.email,
      };
      // Si un avatar a été sélectionné
      if (userData.avatar) {
        updatedUserData.avatar = userData.avatar;
      }
      // Appelez la fonction updateProfile
      const updatedData = await userService.updateProfile(updatedUserData, userData.role);
      
      // Mettre à jour l'état avec les nouvelles données
      setUserData(prevData => ({
        ...prevData,
        ...updatedData,
      }));
      console.log('Profile updated successfully:', updatedData);
       // Recharger les données après la mise à jour
      // window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div className="iq-navbar-header" style={{ height: "215px" }}>
        <div className="container-fluid iq-container">
          <div className="row">
            <div className="col-md-12">
              <div className="flex-wrap d-flex justify-content-between align-items-center">
                <div>
                  
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

      <div className="container-fluid content-inner mt-n5 py-0">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Les informations de l&apos;utilisateur</h4>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                  <div className="profile-img-edit position-relative">
  <img
    src={userData.avatar}
    alt="profile-pic"
    className="theme-color-default-img profile-pic rounded avatar-100"
  />
  <div className="upload-icone bg-primary">
    <div>
      <svg
        className="upload-button icon-14"
        width="14"
        viewBox="0 0 24 24"
      >
        <path
          fill="#ffffff"
          d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
        />
      </svg>
      <input
        className="file-upload"
        type="file"
        accept="image/*"
        onChange={(e) => setUserData({ ...userData, avatar: e.target.files[0] })}
      />
    </div>
  </div>
</div>
                    <div className="img-extension mt-3">
                      <div className="d-inline-block align-items-center">
                       
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select name="type" className="selectpicker form-control" data-style="py-0">
                      <option>{userData.role}</option>
                    </select>
                  </div>

            

                </form>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Les Détails</h4>
                </div>
              </div>
              <div className="card-body">
                <form>
                
                  <div className="form-group">
                    <label className="form-label">Nom et Prénom</label>
                    <input type="text" className="form-control" placeholder="Nom" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} disabled/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">adresse</label>
                    <input type="text" className="form-control" placeholder="addresse" 
                    value={userData.adresse} 
                    onChange={(e) => setUserData({ ...userData, adresse: e.target.value })}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Télephone</label>
                    <input type="text" className="form-control" placeholder="Télephone" value={userData.telephone} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} disabled/>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterAdmin />
    </>
  );
}


export default ProfileAdminComponent
