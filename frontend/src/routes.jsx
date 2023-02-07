import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './context/AuthContext';

import Home from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import Collection from './pages/Collection/CollectionPage';
import Auth from './pages/Auth/AuthPage';

import CratePage from './pages/Restricted/CratePage/CratePage';
import CreateRipoPage from './pages/Restricted/CreateRipo/CreateRipoPage';
import FactionPage from './pages/Restricted/FactionPage/FactionPage';

function AppRoutes() {
  function PrivateRoute() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <Home />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
  }

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/collection" exact element={<Collection />} />

      <Route path="/crate" element={<PrivateRoute />}>
        <Route path="/crate" exact element={<CratePage />} />
      </Route>

      <Route path="/fac" element={<FactionPage />} />

      <Route path="/createRipo" element={<CreateRipoPage />} />

      <Route path="/auth" exact element={<Auth />} />
    </Routes>
  );
}

export default AppRoutes;
