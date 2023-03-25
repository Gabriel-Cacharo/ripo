import { useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { BsCheck } from 'react-icons/bs';

import { verifyPassword } from '../../Auth/utils/verifications';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [error, setError] = useState({
    type: '',
    message: '',
  });

  const userInformations = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const resetPasswordFunction = async () => {
    setError({
      type: '',
      message: '',
    });

    const verifyPasswordResponse = verifyPassword(newPassword, confirmNewPassword);
    if (verifyPasswordResponse) {
      return setError({
        type: 'password',
        message: verifyPasswordResponse.message,
      });
    }

    try {
      await api.post('/user/resetPassword', {
        userId: userInformations.id,
        newPassword,
        oldPassword,
      });

      toast.success('Sua senha foi alterada com sucesso');
      navigate('/profile');
    } catch (err) {
      if (err.response.data.error === 'A senha não coincide') {
        return setError({
          type: 'oldPassword',
          message: err.response.data.error,
        });
      }

      return setError({
        type: 'all',
        message: err.response.data.error,
      });
    }
  };

  return (
    <div className="resetPasswordPageContainer">
      <div className="resetPasswordFormContainer">
        <h2 data-aos="fade-in">Mudar senha</h2>

        <input
          type="password"
          placeholder="Digite sua antiga senha"
          onChange={(e) => setOldPassword(e.target.value)}
          className={error.type === 'oldPassword' || error.type === 'all' ? 'error' : ''}
          data-aos="zoom-in"
        />
        <input
          type="password"
          placeholder="Digite sua nova senha"
          onChange={(e) => setNewPassword(e.target.value)}
          className={error.type === 'password' || error.type === 'all' ? 'error' : ''}
          data-aos="zoom-in"
        />
        <input
          type="password"
          placeholder="Confirme sua nova senha"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className={error.type === 'password' || error.type === 'all' ? 'error' : ''}
          data-aos="zoom-in"
        />
        {error.message && <small className="errorMessage">{error.message}</small>}

        <button type="button" onClick={resetPasswordFunction} className="error" data-aos="fade-in">
          Mudar <BsCheck className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
