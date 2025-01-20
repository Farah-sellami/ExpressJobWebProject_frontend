import PropTypes from 'prop-types';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import authService from "./api/authService";
import AddCategorieComponent from "./components/Admin/Categorie/AddCategorieComponent";
import EditCategorieComponent from './components/Admin/Categorie/EditCategorieComponent';
import ListCategorieComponent from './components/Admin/Categorie/ListCategorieComponent';
import DashboardPage from "./components/Admin/Dashboard";
import ListDemandeServiceComponent from './components/Admin/DemandeService/ListDemandeServiceComponent';
import ProfileAdminComponent from './components/Admin/Profile/ProfileAdminComponent';
import AddServiceComponent from './components/Admin/Services/AddServiceComponent';
import EditServiceComponent from './components/Admin/Services/EditServiceComponent';
import ListServicesComponent from './components/Admin/Services/ListServicesComponent';
import ListUsersComponent from './components/Admin/Users/ListUsersComponent';
import ContactComponent from "./components/ContactComponent";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ServiceComponent from './components/Client/ServiceComponent';
import ListProByServiceComponent from './components/Client/ListProByServiceComponent';
import GetDemandeServiceComponent from './components/Professionnel/getDemandeServiceComponent';



const PrivateRoute = ({  children, allowedRoles }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userHasRequiredRole = allowedRoles.includes(user.role);

  if (!isAuthenticated) {
     // Redirection si l'utilisateur n'est pas authentifié
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    // Redirection si le rôle de l'utilisateur n'est pas autorisé
    return <Navigate to="/" />;
  }
  // Si authentifié et rôle autorisé
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
        path="/AjoutCategorie"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AddCategorieComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/ModifierCategorie/:id"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <EditCategorieComponent />
          </PrivateRoute>
        }
      />
       <Route
            path="/ListCategories"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ListCategorieComponent />
              </PrivateRoute>
            }
          /> 
           <Route
            path="/ListServices"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ListServicesComponent />
              </PrivateRoute>
            }
          /> 
           <Route
            path="/AjoutService"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AddServiceComponent />
              </PrivateRoute>
            }
          /> 
          <Route
            path="/ModifierService/:id"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EditServiceComponent />
              </PrivateRoute>
            }
          /> 
           <Route
            path="/ListUsers"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ListUsersComponent />
              </PrivateRoute>
            }
          /> 
            <Route
            path="/ListDemandeService"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ListDemandeServiceComponent />
              </PrivateRoute>
            }
          /> 
           <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ProfileAdminComponent />
              </PrivateRoute>
            }
          /> 
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <DashboardPage />
              </PrivateRoute>
            }
          /> 
         <Route
            path="/reserverPro"
            element={
              <PrivateRoute allowedRoles={['client']}>
                <ServiceComponent />
              </PrivateRoute>
            }
          /> 
           <Route
            path="/professionnelsByService/:serviceID"
            element={
              <PrivateRoute allowedRoles={['client', 'admin']}>
                <ListProByServiceComponent />
              </PrivateRoute>
            }
          />
                <Route
            path="/demande"
            element={
              <PrivateRoute allowedRoles={['professionnel', 'client']}>
                <GetDemandeServiceComponent />
              </PrivateRoute>
            }
          />
    
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
