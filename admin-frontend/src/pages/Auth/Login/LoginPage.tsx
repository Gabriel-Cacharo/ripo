import { useContext, useState } from 'react';
import { MdLogin } from 'react-icons/md';
import { AuthContext } from '../../../context/AuthContext';

const LoginPage = () => {
  const { contextLoginFunction } = useContext(AuthContext);

  const [error, setError] = useState({
    type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginFunction = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    setError({
      type: '',
      message: '',
    });

    const loginAdminResponse = await contextLoginFunction(email, password);
    if (loginAdminResponse && loginAdminResponse.type === 'error') {
      setError({
        type: 'all',
        message: loginAdminResponse.error.error,
      });
      setLoading(false);
    }
  };

  return (
    <div className="loginPageContainer">
      <form className="loginContainer">
        <h3>Login</h3>

        <div className="loginInputsContainer">
          <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha..." onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="button" onClick={loginFunction} disabled={loading}>
          Logar <MdLogin className="icon" />
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
