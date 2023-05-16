import { AiOutlineDelete, AiFillStar } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

import { IRipoCard } from './types';

const RipoCard = ({ ripo, setModalEditRipoIsOpen, setRipoSelected }: IRipoCard) => {
  const handleOpenEditRipoModal = () => {
    setModalEditRipoIsOpen(true);
    setRipoSelected(ripo);
  };

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
        <button type="button" onClick={handleOpenEditRipoModal}>
          <MdOutlineModeEditOutline className="iconMarginRight" /> Editar
        </button>
        <button type="button">
          <AiOutlineDelete className="iconMarginRight" /> Excluir
        </button>
      </div>
    </div>
  );
};

export default RipoCard;
