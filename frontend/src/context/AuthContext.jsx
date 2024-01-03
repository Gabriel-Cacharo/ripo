import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';

import { api } from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const contextLoginFunction = async (email, password) => {
    try {
      const apiLoginResponse = await api.post('/auth/login', {
        email,
        password,
      });

      let loggedUserInfo = {
        email,
        id: apiLoginResponse.data.user.id,
        coins: apiLoginResponse.data.user.coins,
        userName: apiLoginResponse.data.user.username,
        ripoId: String(apiLoginResponse.data.user.ripoId),
        verifiedEmail: apiLoginResponse.data.user.verifiedEmail,
      };

      jsCookie.set('jwt', apiLoginResponse.data.token, { expires: 2 });
      localStorage.setItem('user', JSON.stringify(loggedUserInfo));
      api.defaults.headers.common['Authorization'] = `Bearer ${apiLoginResponse.data.token}`;

      setUser(loggedUserInfo);

      toast.success('Você fez login com sucesso');

      if (!loggedUserInfo.ripoId || loggedUserInfo.ripoId === 'null' || loggedUserInfo.ripoId === 'undefined') {
        navigate('/createRipo');
      } else {
        navigate('/crate');
      }

      return;
    } catch (error) {
      return {
        type: 'error',
        error: error.response.data,
      };
    }
  };

  const contextRegisterFunction = async (email, password, username) => {
    try {
      const apiRegisterResponse = await api.post('/auth/register', {
        email,
        username,
        password,
      });

      let registeredUserInfo = {
        email,
        id: apiRegisterResponse.data.user.id,
        coins: '0',
        userName: apiRegisterResponse.data.username,
        ripoId: '',
      };

      jsCookie.set('jwt', apiRegisterResponse.data.token, { expires: 2 });
      localStorage.setItem('user', JSON.stringify(registeredUserInfo));
      api.defaults.headers.common['Authorization'] = `Bearer ${apiRegisterResponse.data.token}`;

      setUser(registeredUserInfo);

      toast.success('Sua conta foi criada com sucesso');
      navigate('/createRipo');

      return;
    } catch (error) {
      return {
        type: 'error',
        error: error.response.data.error,
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
      navigate('/');
    } catch (err) {
      toast.error('Ocorreu um erro ao se deslogar. Tente novamente mais tarde');
    }
  };

  const contextSetUserCoins = (coins) => {
    try {
      setUser({ ...user, coins: coins });
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      return;
    }
  };

  const contextSetUserRipoId = async (id) => {
    try {
      const updatedUser = { ...user, ripoId: id };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        contextLoginFunction,
        contextRegisterFunction,
        contextLogoutFunction,
        contextSetUserCoins,
        contextSetUserRipoId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
