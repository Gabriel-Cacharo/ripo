import { AiOutlineDelete, AiFillStar } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import CoinsIcon from '../../assets/images/Coins_Icon.png';

import { ICrateCard } from './types';

const CrateCard = ({ crate, setModalEditCrateIsOpen, setCrateSelected }: ICrateCard) => {
  const handleOpenEditRipoModal = () => {
    setModalEditCrateIsOpen(true);
    setCrateSelected(crate);
  };

  return (
    <div className="crateCard">
      <img src={crate.crateImage} alt="User Ripo" />
      <h3>{crate.name}</h3>

      <div className="crateCardInformations">
        <div>
          <img src={CoinsIcon} alt="Coins Icon" className="iconMarginRight" />
          <p>{crate.price}</p>
        </div>
        <div>
          <AiFillStar
            className={`icon ${
              crate.rarity === 0 ? 'common' : crate.rarity === 1 ? 'unusual' : crate.rarity === 2 ? 'rare' : 'legendary'
            }`}
          />
          <p>
            {crate.rarity === 0 ? 'Comum' : crate.rarity === 1 ? 'Incomum' : crate.rarity === 2 ? 'Raro' : 'Lendário'}
          </p>
        </div>
      </div>

      <div className="crateCardButtonsContainer">
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

export default CrateCard;
