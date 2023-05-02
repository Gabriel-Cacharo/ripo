import { Route, Routes } from 'react-router-dom';

import UsersPage from './pages/Users/UsersPage';
import UserPage from './pages/User/UserPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/:username" element={<UserPage />} />
    </Routes>
  );
};

export default AppRoutes;
