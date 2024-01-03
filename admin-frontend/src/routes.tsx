import { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import UsersPage from './pages/Users/UsersPage';
import UserPage from './pages/User/UserPage';
import LoginPage from './pages/Auth/Login/LoginPage';
import RiposPage from './pages/Ripos/RiposPage';
import CratesPage from './pages/Crates/CratesPage';

import { AuthContext } from './context/AuthContext';
import EditRipoPage from './pages/RecreateRipo/RecreateRipoPage';

const AppRoutes = () => {
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useContext(AuthContext);

  function PrivateRoute() {
    if (loading) {
      return <div></div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate('/auth/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/users" element={<PrivateRoute />}>
        <Route path="/users" element={<UsersPage />} />
      </Route>

      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user" element={<UserPage />} />
      </Route>

      <Route path="/user/:username" element={<PrivateRoute />}>
        <Route path="/user/:username" element={<UserPage />} />
      </Route>

      <Route path="/ripos" element={<PrivateRoute />}>
        <Route path="/ripos" element={<RiposPage />} />
      </Route>

      <Route path="/crates" element={<PrivateRoute />}>
        <Route path="/crates" element={<CratesPage />} />
      </Route>

      <Route path="/recreateRipo/:ripoId" element={<PrivateRoute />}>
        <Route path="/recreateRipo/:ripoId" element={<EditRipoPage />} />
      </Route>

      <Route path="/auth/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
