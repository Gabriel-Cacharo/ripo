import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';

import { api } from '../services/api';

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

      api.defaults.headers.common['Authorization'] = `Bearer ${loggedUserJwt}`;
    } else {
      localStorage.clear();
      jsCookie.remove('jwt');
    }

    setLoading(false);
  }, []);

  const contextLoginFunction = async (email, password) => {
    try {
      const apiLoginResponse = await api.post('api/login', {
        email,
        password,
      });

      let loggedUserInfo = {
        email,
        id: apiLoginResponse.data.user.id,
        coins: apiLoginResponse.data.user.coins,
        userName: apiLoginResponse.data.username,
      };

      jsCookie.set('jwt', apiLoginResponse.data.token, { expires: 1 });
      localStorage.setItem('user', JSON.stringify(loggedUserInfo));
      api.defaults.headers.common['Authorization'] = `Bearer ${apiLoginResponse.data.token}`;

      setUser(loggedUserInfo);

      return;
    } catch (error) {
      console.log('error');
      return {
        type: 'error',
        error: error.response.data,
      };
    }
  };

  const contextRegisterFunction = async (email, password, username) => {
    try {
      const apiRegisterResponse = await api.post('api/register', {
        email,
        username,
        password,
      });
    } catch (error) {
      return {
        type: 'error',
        error: error.response.data,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, loading, contextLoginFunction, contextRegisterFunction }}>
      {children}
    </AuthContext.Provider>
  );
};
