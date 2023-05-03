import { createContext, useState, useEffect } from 'react';
import jsCookie from 'js-cookie';

import { api } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { IAuthProvider, IUser } from './types';

export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const loggedUserInfo = localStorage.getItem('user');
    const loggedUserJwt = jsCookie.get('jwt');

    if (loggedUserInfo && loggedUserJwt) {
      setUser(JSON.parse(loggedUserInfo));

      api.defaults.headers.common['authorization'] = `Bearer ${loggedUserJwt}`;
    } else {
      localStorage.clear();
      jsCookie.remove('jwt');
    }

    setLoading(false);
  }, []);

  const contextLoginFunction = async (email: string, password: string) => {
    try {
      const apiLoginAdminResponse = await api.post('/auth/admin/login', {
        email,
        password,
      });

      let loggedUserInfo = {
        email,
        id: apiLoginAdminResponse.data.user.id,
        coins: apiLoginAdminResponse.data.user.coins,
        userName: apiLoginAdminResponse.data.user.username,
        ripoId: String(apiLoginAdminResponse.data.user.ripoId),
        verifiedEmail: apiLoginAdminResponse.data.user.verifiedEmail,
        admin: apiLoginAdminResponse.data.user.admin,
      };

      jsCookie.set('jwt', apiLoginAdminResponse.data.token, { expires: 2 });
      localStorage.setItem('user', JSON.stringify(loggedUserInfo));
      api.defaults.headers.common['Authorization'] = `Bearer ${apiLoginAdminResponse.data.token}`;

      setUser(loggedUserInfo);
      toast.success('Você fez login com sucesso');

      navigate('/');
      return;
    } catch (error: any) {
      toast.error(error.response.data.error);
      return {
        type: 'error',
        error: error.response.data,
      };
    }
  };

  const contextLogoutFunction = () => {
    try {
      setUser(null);
      api.defaults.headers.common['Authorization'] = ``;
      jsCookie.remove('jwt');
      localStorage.removeItem('user');

      toast.success('Você se deslogou com sucesso');
      navigate('/auth/login');
    } catch (err) {
      toast.error('Ocorreu um erro ao se deslogar. Tente novamente mais tarde');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, contextLoginFunction, contextLogoutFunction }}
    >
      {children}
    </AuthContext.Provider>
  );
};
