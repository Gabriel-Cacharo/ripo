import { Route, Routes, Outlet, Navigate, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './context/AuthContext';

import Home from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import Collection from './pages/Collection/CollectionPage';

import Auth from './pages/Auth/AuthPage';
import ResetPasswordPage from './pages/Restricted/ResetPassword/ResetPasswordPage';

import CratePage from './pages/Restricted/CratePage/CratePage';
import CreateRipoPage from './pages/Restricted/CreateRipo/CreateRipoPage';
import ProfilePage from './pages/Restricted/ProfilePage/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPassword';
import VerifyAccountPage from './pages/VerifyAccount/VerifyAccount';

function AppRoutes() {
  function PrivateRoute() {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <Home />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
  }

  function CreateRipoRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
      return <Home />;
    }

    return !user.ripoId || user.ripoId === 'null' || user.ripoId === 'undefined' ? (
      <Outlet />
    ) : (
      <Navigate to="/createRipo/recreate" />
    );
  }

  function EditRipoRoute() {
    const { user, loading } = useContext(AuthContext);
    const { recreate } = useParams();

    if (!recreate || recreate !== 'recreate') {
      <Navigate to="/profile" />;
    }

    if (loading) {
      return <Home />;
    }

    return <Outlet />;
  }

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/collection" exact element={<Collection />} />

      <Route path="/crate" element={<PrivateRoute />}>
        <Route path="/crate" exact element={<CratePage />} />
      </Route>

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />

      <Route path="createRipo" element={<CreateRipoRoute />}>
        <Route path="/createRipo" element={<CreateRipoPage />} />
      </Route>

      <Route path="createRipo/:recreate" element={<EditRipoRoute />}>
        <Route path="/createRipo/:recreate" element={<CreateRipoPage />} />
      </Route>

      <Route path="/auth" exact element={<Auth />} />

      <Route path="/auth/forgotPassword" exact element={<ForgotPasswordPage />} />
      <Route path="/auth/verifyAccountEmail" exact element={<VerifyAccountPage />} />

      <Route path="/auth/resetPassword" element={<PrivateRoute />}>
        <Route path="/auth/resetPassword" exact element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
