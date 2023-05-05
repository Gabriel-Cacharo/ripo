import { Link } from 'react-router-dom';

import { AiOutlineDelete, AiFillStar } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

export interface IRipo {
  ripo: {
    id: number;
    name: string;
    price: string;
    public: boolean;
    rarity: number;
    ripoImage: string;
    createdAt: string;
    updatedAt: string;
  };
}

const RipoCard = ({ ripo }: IRipo) => {
  return (
    <div className="ripoCard">
      <img src={ripo.ripoImage} alt="User Ripo" />
      <h3>{ripo.name}</h3>

      <div className="ripoCardInformations">
        <div>
          <img src={CoinsIcon} alt="Coins Icon" className="iconMarginRight" />
          <p>{ripo.price}</p>
        </div>
        <div>
          <AiFillStar
            className={`icon ${
              ripo.rarity === 0 ? 'common' : ripo.rarity === 1 ? 'unusual' : ripo.rarity === 2 ? 'rare' : 'legendary'
            }`}
          />
          <p>{ripo.rarity === 0 ? 'Comum' : ripo.rarity === 1 ? 'Incomum' : ripo.rarity === 2 ? 'Raro' : 'Lendário'}</p>
        </div>
      </div>

      <div className="ripoCardButtonsContainer">
        <Link to={`/user/${ripo.name}`}>
          <MdOutlineModeEditOutline className="iconMarginRight" /> Editar
        </Link>
        <Link to={''}>
          <AiOutlineDelete className="iconMarginRight" /> Excluir
        </Link>
      </div>
    </div>
  );
};

export default RipoCard;
