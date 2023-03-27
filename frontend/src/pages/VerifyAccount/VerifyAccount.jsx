import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

const VerifyAccountPage = () => {
  const navigate = useNavigate();

  const verifyAccountFunction = async () => {
    try {
      await api.post('/user/verifyAccountEmail');
      toast.success('Email verificado com sucesso.');
      return navigate('/crate');
    } catch (err) {
      toast.error(err.response.data.error);
      return navigate('/crate');
    }
  };

  useEffect(() => {
    verifyAccountFunction();
  }, []);

  return <div className="verifyAccountPageContainer"></div>;
};

export default VerifyAccountPage;
