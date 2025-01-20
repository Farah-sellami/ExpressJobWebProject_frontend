import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../api/authService';

const Logo = () => (
  <svg className="icon-30 text-primary" width="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
    <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
    <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
    <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // const toggleHomeDropdown = () => setIsHomeDropdownOpen(!isHomeDropdownOpen);
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  return (
    <div className="position-relative">
      <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar header-hover-menu">
        <div className="container-fluid navbar-inner">
          <div className="d-flex align-items-center justify-content-between w-100 landing-header">
          <Link className="navbar-brand m-0 d-xl-flex d-none" to="/">
              <Logo />
              <h5 className="logo-title">EXPRESS JOB</h5>        
            </Link>
            <div className="d-flex align-items-center d-xl-none">
              <button
                onClick={toggleMobileMenu}
                className="d-xl-none btn btn-primary rounded-pill p-1 pt-0"
                type="button"
              >
                <svg width="20px" className="icon-20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </button>
              <Link className="navbar-brand ms-3 d-xl-none" to="/">
                <Logo />
                <h5 className="logo-title">EXPRESS JOB</h5>
              </Link>
            </div>
            <ul className="d-block d-xl-none list-unstyled m-0">
              <li className="nav-item dropdown iq-responsive-menu">
                <div className="btn btn-sm bg-body" id="navbarDropdown-search-11" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown-search-11" style={{ width: '18rem' }}>
                  <li className="px-3 py-0">
                    <div className="form-group input-group mb-0">
                      <input type="text" className="form-control" placeholder="Search..." />
                      <span className="input-group-text">
                        <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
           
            <nav id="navbar_main" className={`mobile-offcanvas nav navbar navbar-expand-xl hover-nav horizontal-nav ${isMobileMenuOpen ? 'show' : ''}`}>
              <div className="container-fluid p-lg-0">
                <div className="offcanvas-header px-0">
                <Link className="navbar-brand ms-3 d-xl-none" to="/">
                    <Logo />
                    <h5 className="logo-title">EXPRESS JOB</h5>
                </Link>
                  <button className="btn-close float-end px-3" onClick={toggleMobileMenu}></button>
                </div>
                <ul className="navbar-nav iq-nav-menu list-unstyled" id="header-menu">
                  {/* <li className="nav-item">
                    <a
                      className="nav-link menu-arrow justify-content-start"
                      onClick={toggleHomeDropdown}
                      role="button"
                    >
                      <span className="item-name">Home</span>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-18" width="18" height="18" viewBox="0 0 24 24">
                        <path d="M19 8.5L12 15.5L5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <ul className={`iq-header-sub-menu list-unstyled collapse ${isHomeDropdownOpen ? 'show' : ''}`} id="homeData">
                      <li className="nav-item"><a className="nav-link active" href="../landing-pages/index.html">App Landing Page</a></li>
                      <li className="nav-item"><a className="nav-link" href="../landing-pages/software-landing-page.html">Software Landing Page</a></li>
                    </ul>
                  </li> */}
                  <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
                  <li className="nav-item">
  {isAuthenticated ? (
    <>
      {userRole === "Admin" && (
        <Link className="nav-link" to="/dashboard">
          Réserver un service
        </Link>
      )}
      {userRole === "Client" && (
        <Link className="nav-link" to="/reserverPro">
          Réserver un service
        </Link>
      )}
      {userRole === "Professionnel" && (
        <Link className="nav-link" to="/me">
          Réserver un service
        </Link>
      )}
    </>
  ) : (
    <Link className="nav-link" to="/login">
      Réserver un service
    </Link>
  )}
</li>
                
                 <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contactez-nous
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Compte
                  </Link>
                </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

