import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import serviceService from '../api/serviceService';

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'client',
        addresse: '',
        telephone: '',
        avatar: null,
        competence : '',
        available_hours : '',
        note_moyenne : '',
        location : '',
        service_id: '',
      });
      const [error, setError] = useState('');
      const [services, setServices] = useState([]);// Liste des services pour professionnels
      const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState({
        password: false,
        password_confirmation: false
      });

      const togglePasswordVisibility = (field) => {
        setShowPassword({
          ...showPassword,
          [field]: !showPassword[field]
        });
      };
    

      useEffect(() => {
        // Fetch services for Professionnels
        const fetchServices = async () => {
          try {
            const servicesList  = await serviceService.getAllServices();
            console.log(servicesList);
 
            setServices(servicesList );
          } catch (err) {
            console.error('Erreur lors de la récupération des services:', err);
          }
        };
        fetchServices();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      const handleFileChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: e.target.files[0],
        }));
      };


      const validateForm = () => {
       
        if (!formData.role) {
          setError('Veuillez sélectionner un rôle.');
          return false;
        }
        if (formData.role === 'professionnel' && !formData.service_id) {
          setError('Veuillez sélectionner un service pour les professionnels.');
          return false;
        }
        return true;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
          // Valider que les mots de passe sont identiques
  if (formData.password !== formData.password_confirmation) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }
        if (!validateForm()) return;
    
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) formDataToSend.append(key, value);
        });
    
        try {
          const result = await authService.register(formDataToSend);
          alert(result.message); 

          // Réinitialiser le formulaire si l'inscription est réussie
          setFormData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: 'client',
            adresse: '',
            telephone: '',
            avatar: null,
            competence: '',
            available_hours: '',
            note_moyenne: '',
            location: '',
            service_id: '',
          });
      
          navigate('/login'); // Rediriger l'utilisateur vers la page de connexion
        } catch (error) {
          console.error('Erreur :', error);
          // Gérer les erreurs d'inscription et les afficher
          setError(
            error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
          );
        }
      };

      return (
        <div className="wrapper">
          <section className="login-content">
            <div className="row m-0 align-items-center bg-white h-100">
              <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                <img src="../../assets/images/auth/05.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
              </div>
              <div className="col-md-6">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <div className="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                      <div className="card-body">
                        <Link to="/" className="navbar-brand d-flex align-items-center mb-3">
                          <div className="logo-main">
                            <div className="logo-normal">
                              <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                              </svg>
                            </div>
                            <div className="logo-mini">
                              <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                              </svg>
                            </div>
                          </div>
                          <h4 className="logo-title ms-3">EXPRESS JOB</h4>
                        </Link>
                        <h2 className="mb-2 text-center"> S&apos;inscrire</h2>
      
                        <p className="text-danger text-center mb-3">{error}</p>
      
                        <p className="text-center">Créez votre compte.</p>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="name" className="form-label">Nom et prénom</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="Nom"
                                  required
                                />
                              </div>
                            </div>
      
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="example@example.com"
                                  required
                                />
                              </div>
                            </div>
      
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="addresse" className="form-label">Adresse</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="addresse"
                                  name="addresse"
                                  value={formData.addresse}
                                  onChange={handleChange}
                                  placeholder="adresse"
                                />
                              </div>
                            </div>
      
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="telephone" className="form-label">Téléphone</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="telephone"
                                  name="telephone"
                                  value={formData.telephone}
                                  onChange={handleChange}
                                  placeholder="12345678"
                                  pattern="[0-9]{8}" 
                                />
                              </div>
                            </div>
      
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="role" className="form-label">Vous êtes ?</label>
                                <select
                                  id="role"
                                  name="role"
                                  value={formData.role}
                                  onChange={handleChange}
                                  required
                                  className="form-control"
                                >
                                  <option value="">Sélectionnez un rôle</option>
                                  <option value="client">Client</option>
                                  <option value="professionnel">Professionnel</option>
                                </select>
                              </div>
                            </div>
      
                            <div className="col-lg-6">
      <div className="form-group">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <div className="input-group">
          <input
            type={showPassword.password ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
          <button
            type="button"
            className="input-group-text"
            onClick={() => togglePasswordVisibility('password')}
          >
            <i className={`fa ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'}`} />
            <svg className="icon-32" width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M22.4541 11.3918C22.7819 11.7385 22.7819 12.2615 22.4541 12.6082C21.0124 14.1335 16.8768 18 12 18C7.12317 18 2.98759 14.1335 1.54586 12.6082C1.21811 12.2615 1.21811 11.7385 1.54586 11.3918C2.98759 9.86647 7.12317 6 12 6C16.8768 6 21.0124 9.86647 22.4541 11.3918Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"></path>                                    <circle cx="12" cy="12" r="5" stroke="currentColor"></circle>                                    <circle cx="12" cy="12" r="3" fill="currentColor"></circle>                                    <mask mask-type="alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="6" height="6">                                    <circle cx="12" cy="12" r="3" fill="currentColor"></circle>                                    </mask>                                    <circle opacity="0.53" cx="13.5" cy="10.5" r="1.5" fill="white"></circle>                                
            </svg>   
          </button>
        </div>
      </div>
    </div>

    <div className="col-lg-6">
      <div className="form-group">
        <label htmlFor="password_confirmation" className="form-label">Confirmation MDP</label>
        <div className="input-group">
          <input
            type={showPassword.password_confirmation ? 'text' : 'password'}
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="********"
          />
          <button
            type="button"
            className="input-group-text"
            onClick={() => togglePasswordVisibility('password_confirmation')}
          >
            <i className={`fa ${showPassword.password_confirmation ? 'fa-eye-slash' : 'fa-eye'}`} />
            <svg className="icon-32" width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M22.4541 11.3918C22.7819 11.7385 22.7819 12.2615 22.4541 12.6082C21.0124 14.1335 16.8768 18 12 18C7.12317 18 2.98759 14.1335 1.54586 12.6082C1.21811 12.2615 1.21811 11.7385 1.54586 11.3918C2.98759 9.86647 7.12317 6 12 6C16.8768 6 21.0124 9.86647 22.4541 11.3918Z" fill="currentColor" fill-opacity="0.4" stroke="currentColor"></path>                                    <circle cx="12" cy="12" r="5" stroke="currentColor"></circle>                                    <circle cx="12" cy="12" r="3" fill="currentColor"></circle>                                    <mask mask-type="alpha" maskUnits="userSpaceOnUse" x="9" y="9" width="6" height="6">                                    <circle cx="12" cy="12" r="3" fill="currentColor"></circle>                                    </mask>                                    <circle opacity="0.53" cx="13.5" cy="10.5" r="1.5" fill="white"></circle>                                
            </svg>                            
          </button>
        </div>
      </div>
    </div>
      
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="avatar" className="form-label custom-file-input">Photo de profil</label>
                                <input
                                  type="file"
                                  id="avatar"
                                  name="avatar"
                                  onChange={handleFileChange}
                                  className="form-control"
                                />
                              </div>
                            </div>
      
                            {formData.role === 'professionnel' && (
                              <>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="competence" className="form-label">Compétence</label>
                                    <textarea
                                      className="form-control"
                                      id="competence"
                                      name="competence"
                                      value={formData.competence}
                                      onChange={handleChange}
                                      placeholder="Compétence"
                                    />
                                  </div>
                                </div>
      
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="available_hours" className="form-label">Horaires disponibles</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="available_hours"
                                      name="available_hours"
                                      value={formData.available_hours}
                                      onChange={handleChange}
                                      placeholder="Disponibilités"
                                    />
                                  </div>
                                </div>
      
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="location" className="form-label">Ville</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="location"
                                      name="location"
                                      value={formData.location}
                                      onChange={handleChange}
                                      placeholder="Ville"
                                    />
                                  </div>
                                </div>
      
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="service_id" className="form-label">Service</label>
                                    <select
                                      id="service_id"
                                      name="service_id"
                                      value={formData.service_id}
                                      onChange={handleChange}
                                      required
                                      className="form-control"
                                    >
                                      <option value="">Sélectionnez un service</option>
                                      {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                          {service.Titre}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
      
                            <div className="d-flex justify-content-center">
                              <button type="submit" className="btn btn-primary">
                                S&apos;inscrire
                              </button>
                            </div>
      
                            {error && <p className="text-danger">{error}</p>}
                            <p className="mt-3 text-center">
                              Vous avez déjà un compte ? Connectez-vous{" "}
                              <Link to="/login" className="text-underline">
                                Se connecter
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
      
    };

export default RegisterComponent;

