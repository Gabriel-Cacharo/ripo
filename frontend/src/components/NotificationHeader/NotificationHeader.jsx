import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NotificationHeader = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if ((isAuthenticated && user.ripoId === 'null') || (isAuthenticated && !user.ripoId)) {
    return (
      <div className="notificationHeaderContainer">
        <h4>Você ainda não criou seu Ripo</h4>
        <Link to="/createRipo">Clique aqui para criar </Link>
      </div>
    );
  }

  if ((isAuthenticated && !user.verifiedEmail) || (isAuthenticated && user.verifiedEmail === false)) {
    return (
      <div className="notificationHeaderContainer">
        <h4>Verifique seu email para ganhar 1 caixa grátis</h4>
      </div>
    );
  }
};

export default NotificationHeader;
