import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';

function NavbarClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = authService.getUserRole();
  const isAuthenticated = authService.isAuthenticated();

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div>
    <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu">
      <div className="container-fluid navbar-inner">
        <div className="d-flex align-items-center justify-content-between w-100 landing-header">
          <Link className="navbar-brand m-0 d-xl-flex d-none" to="/">
            <svg
              className="icon-30 text-primary"
              width="30"
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
            <h5 className="logo-title">EXPRESS JOB</h5>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="d-xl-none btn btn-primary rounded-pill p-1 pt-0"
            type="button"
          >
            <svg width="20px" className="icon-20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              />
            </svg>
          </button>
          <nav
            className={`mobile-offcanvas nav navbar navbar-expand-xl ${
              isMobileMenuOpen ? 'show' : ''
            }`}
          >
            <ul className="navbar-nav iq-nav-menu list-unstyled">
              {isAuthenticated && userRole === 'Client' && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/reserverPro">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/me">
              Compte
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/demande">
              Vos demandes
            </Link>
          </li>
        </>
      )}
      {isAuthenticated && userRole === 'Professionnel' && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/me">
              Compte
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/demande">
              Vos demandes
            </Link>
          </li>
        </>
      )}
      <li className="nav-item">
        <Link className="nav-link" to="/contact">
          Contactez-nous
        </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  </div>
);
}
export default NavbarClient
