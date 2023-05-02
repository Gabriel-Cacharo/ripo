import { Link } from 'react-router-dom';

import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

interface IUser {
  user: {
    id: number;
    username: string;
    facName: string;
    xp: string;
    coins: string;
    ripoId: {
      id: number;
      ripoImage: string;
      public: boolean | null;
      rarity: number;
      name: string;
    };
  };
}

const UserCard = ({ user }: IUser) => {
  return (
    <div className="userCard">
      <img src={user.ripoId.ripoImage} alt="User Ripo" />
      <h3>{user.username}</h3>

      <div className="userCardInformations">
        <img src={CoinsIcon} alt="Coins Icon" className="iconMarginRight" />
        <p>{user.coins}</p>
      </div>

      <div className="userCardButtonsContainer">
        <Link to={`/user/${user.username}`}>
          <MdOutlineModeEditOutline className="iconMarginRight" /> Editar
        </Link>
        <Link>
          <AiOutlineDelete className="iconMarginRight" /> Excluir
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
