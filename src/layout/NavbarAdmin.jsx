
import { Link , useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../api/authService';

function NavbarAdmin() {
   const [user, setUser] = useState({ username: '', email: '' });
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
    }, []);
    const navigate = useNavigate();
    const handleLogout = () => {
      authService.logout();
      navigate('/login');
    };
 
  return (
    <nav className="nav navbar navbar-expand-xl navbar-light iq-navbar">
    <div className="container-fluid navbar-inner">
   
      <div className="col-lg-2 col-lg-3 navbar-brand navbar-horizontal-brand">
        <Link to="/dashboard"  className="navbar-brand navbar-horizontal-brand">
        
          {/*Logo start*/}
          <svg className="icon-30 text-primary" width="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"></rect>
              <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"></rect>
              <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"></rect>
              <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"></rect>
          </svg>
          {/*logo End*/}       
           <h4 className="logo-title">EXPRESS JOB</h4>
           </Link>
      </div>
      {/* Horizontal Menu Start */}
      <nav id="navbar_main" className="mobile-offcanvas nav navbar navbar-expand-xl hover-nav horizontal-nav mx-md-auto">
         <div className="container-fluid">
            <div className="offcanvas-header px-0">
               <a href="../dashboard/index.html" className="navbar-brand ms-3">
                  
                  {/*Logo start*/}
                  <div className="logo-main">
                      <div className="logo-normal">
                          <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                              <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                              <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                              <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
                          </svg>
                      </div>
                      <div className="logo-mini">
                          <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                              <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                              <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                              <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
                          </svg>
                      </div>
                  </div>
                  {/*logo End*/}
                  
                  
                  
                  
                  <h4 className="logo-title">EXPRESS JOB</h4>
               </a>
               <button className="btn-close float-end"></button>
            </div>
            <ul className="navbar-nav">
               <li className="nav-item">
                     <Link to="/dashboard" className="nav-link">Dashboard</Link>
             </li>
               <li className="nav-item">
               <Link to="/profile" className="nav-link ">Profil</Link>
             </li>
             <li className="nav-item">
               <Link to="/ListUsers" className="nav-link ">Utilisateurs</Link>
             </li>
             <li className="nav-item">
               <Link to="/ListServices" className="nav-link ">Services</Link>
             </li>
             <li className="nav-item">
               <Link to="/ListCategories" className="nav-link ">Categories</Link>
             </li>
             <li className="nav-item">
               <Link to="/ListDemandeService" className="nav-link ">Demande Services</Link>
             </li>
            </ul>
         </div> {/* container-fluid.// */}
      </nav>
      {/* Sidebar Menu End */}    
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon">
            <span className="navbar-toggler-bar bar1 mt-2"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>    
      </button>
      <div className="collapse navbar-collapse col-md-2" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
          {/* <li className="nav-item dropdown">
            <a href="#"  className="nav-link" id="notification-drop" data-bs-toggle="dropdown" >
                <svg className="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor">

                  </path>
                  <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor"></path>
                </svg>
                <span className="bg-danger dots"></span>
            </a>
  
          </li> */}
          <li className="nav-item dropdown">
            {/* <a href="#" className="nav-link" id="mail-drop" data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
              <svg className="icon-24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z" fill="currentColor"></path>
                <path d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z" fill="currentColor"></path>
              </svg>
              <span className="bg-primary count-mail"></span>
            </a> */}
         
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../assets/images/avatars/01.png" alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"/>
              <img src={user.avatar} alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded"/>
              <div className="caption ms-3 d-none d-md-block">
                  <h6 className="mb-0 caption-title"> {user.name}</h6>
                
              </div>
            </a>
            <ul className="dropdown-menu shadow dropdown-menu-end" aria-labelledby="navbarDropdown">

              <li>
               
                <Link to="/profile" className="dropdown-item">Profil</Link>
                </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
              <button className="dropdown-item" onClick={handleLogout}>Déconnexion</button>
             
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>      
//   {/*Nav End*/}

  )
}

export default NavbarAdmin
