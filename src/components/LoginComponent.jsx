import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const LoginComponent = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const [error,setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const handleChange = (e) => {
    const { name , value } = e.target;
    setCredentials(prevState => 
      ({ ...prevState, 
        [name]: value 
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await authService.login(credentials);
      if (result.success) {
        // Utiliser les données utilisateur renvoyées par le backend
        const { name, email, role } = result.user;

        // Logique de redirection en fonction du rôle
        if (result.user.role === 'admin') {
          navigate('/dashboard');
        } else if (result.user.role === 'client' || role === 'client') {
          navigate('/reserverPro');
        } else if (result.user.role === 'professionnel') {
          navigate('/demande');  // Rediriger vers /me pour les professionnels
        }

        console.log(`Utilisateur connecté : ${role}, ${name}, ${email}`);
      } else {
        setError(result.message || 'Erreur de connexion');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  };

  if (isLoading) {
    return (
      <div id="loading">
        <div className="loader simple-loader">
          <div className="loader-body"></div>
        </div>
      </div>
    );
  }
    return (
            <div className="wrapper">
              <section className="login-content">
                <div className="row m-0 align-items-center bg-white vh-100">
                  <div className="col-md-6">
                    <div className="row justify-content-center">
                      <div className="col-md-10">
                        <div className="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                          <div className="card-body z-3 px-md-0 px-lg-4">
                          <Link to="/" className="navbar-brand d-flex align-items-center mb-3">
                              <div className="logo-main">
                                <div className="logo-normal">
                                  <svg
                                    className="text-primary icon-30"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="-0.757324"
                                      y="19.2427"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(-45 -0.757324 19.2427)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="7.72803"
                                      y="27.728"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(-45 7.72803 27.728)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="10.5366"
                                      y="16.3945"
                                      width="16"
                                      height="4"
                                      rx="2"
                                      transform="rotate(45 10.5366 16.3945)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="10.5562"
                                      y="-0.556152"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(45 10.5562 -0.556152)"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                                <div className="logo-mini">
                                  <svg
                                    className="text-primary icon-30"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="-0.757324"
                                      y="19.2427"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(-45 -0.757324 19.2427)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="7.72803"
                                      y="27.728"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(-45 7.72803 27.728)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="10.5366"
                                      y="16.3945"
                                      width="16"
                                      height="4"
                                      rx="2"
                                      transform="rotate(45 10.5366 16.3945)"
                                      fill="currentColor"
                                    />
                                    <rect
                                      x="10.5562"
                                      y="-0.556152"
                                      width="28"
                                      height="4"
                                      rx="2"
                                      transform="rotate(45 10.5562 -0.556152)"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <h4 className="logo-title ms-3">EXPRESS JOB</h4>
                            
                            </Link>
                            <h2 className="mb-2 text-center">Se connecter</h2>
                            <p className="text-center">Connectez-vous pour rester connecté.</p>
                            <form onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      aria-describedby="email"
                                      placeholder=" "
                                      autoComplete="email"
                                      required
                                      value={credentials.email}
                                      onChange={handleChange}
                                     
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="password"
                                      className="form-label"
                                    >
                                      Mot de passe
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      aria-describedby="password"
                                      placeholder=" "
                                      autoComplete="current-password"
                                      required
                                      value={credentials.password}
                                      onChange={handleChange}
                                      
                                    />
                                  </div>
                                </div>
                                {error && <div className="text-red-500 text-sm">{error}</div>}

                                <div className="col-lg-12 d-flex justify-content-between">
                                
                                  <Link to="/auth/recoverpw" className="text-sm text-blue-600 hover:underline">
                                     mot de passe oublié ?
                                  </Link>
                                </div>
                              </div>
                               {/* Affichage des erreurs */}
                                {error && <p className="text-sm text-red-600">{error}</p>}
                              <div className="d-flex justify-content-center">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Se connecter
                                </button>
                              </div>
                              <p className="mt-3 text-center">
                              Vous n’avez pas de compte ?{" "}
                                <Link to="/register" className="text-blue-600 hover:underline">
                                    Cliquer ici pour se connecter.
                                </Link>
                              </p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-bg">
                      <svg
                        width="280"
                        height="230"
                        viewBox="0 0 431 398"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.05">
                          <rect
                            x="-157.085"
                            y="193.773"
                            width="543"
                            height="77.5714"
                            rx="38.7857"
                            transform="rotate(-45 -157.085 193.773)"
                            fill="#3B8AFF"
                          />
                          <rect
                            x="7.46875"
                            y="358.327"
                            width="543"
                            height="77.5714"
                            rx="38.7857"
                            transform="rotate(-45 7.46875 358.327)"
                            fill="#3B8AFF"
                          />
                          <rect
                            x="61.9355"
                            y="138.545"
                            width="310.286"
                            height="77.5714"
                            rx="38.7857"
                            transform="rotate(45 61.9355 138.545)"
                            fill="#3B8AFF"
                          />
                          <rect
                            x="62.3154"
                            y="-190.173"
                            width="543"
                            height="77.5714"
                            rx="38.7857"
                            transform="rotate(45 62.3154 -190.173)"
                            fill="#3B8AFF"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                    <img
                      src="../../assets/images/auth/01.png"
                      className="img-fluid gradient-main animated-scaleX"
                      alt="images"
                    />
                  </div>
                </div>
              </section>
            </div>
    );
  };
  
  export default LoginComponent;
  