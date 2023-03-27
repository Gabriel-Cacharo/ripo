import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { verifyPassword } from '../Auth/utils/verifications';

const ForgotPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState({
    type: '',
    message: '',
  });

  const [query, setQuery] = useSearchParams();

  const navigate = useNavigate();

  const forgotPasswordFunction = async () => {
    if (query.get('token')) {
      const verifyPasswordResponse = verifyPassword(password, confirmPassword);
      if (verifyPasswordResponse) {
        return setError({
          type: 'password',
          message: verifyPasswordResponse.message,
        });
      }

      try {
        await api.post('/auth/acceptForgotPassword', {
          token: query.get('token'),
          newPassword: password,
        });

        toast.success('A senha foi alterada com sucesso');

        return navigate('/');
      } catch (err) {
        return toast.error(err.response.data.error);
      }
    } else {
      if (!email) {
        return toast.error('Você deve fornecer um email');
      }

      try {
        const forgotPasswordResponse = await api.post('/auth/forgotPassword', { email });

        return toast.success(forgotPasswordResponse.data.message);
      } catch (err) {
        return toast.error(err.response.data.error);
      }
    }
  };

  return (
    <div className="forgotPasswordPageContainer">
      <div className="forgotPasswordFormContainer">
        <h2>Esqueci minha senha</h2>

        {query.get('token') ? (
          <>
            <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} />
            <input
              type="password"
              placeholder="Confirme sua nova senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={forgotPasswordFunction}>
              Alterar <BsCheck className="icon" />
            </button>
          </>
        ) : (
          <>
            <input type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={forgotPasswordFunction}>
              Enviar <BsCheck className="icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
