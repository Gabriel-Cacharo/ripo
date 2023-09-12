import { Route, Routes } from 'react-router-dom';

import UsersPage from './pages/Users/UsersPage';
import UserPage from './pages/User/UserPage';

import LoginPage from './pages/Auth/Login/LoginPage';

import RiposPage from './pages/Ripos/RiposPage';
import CratesPage from './pages/Crates/CratesPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/:username" element={<UserPage />} />

      <Route path="/ripos" element={<RiposPage />} />

      <Route path="/crates" element={<CratesPage />} />

      <Route path="/auth/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
