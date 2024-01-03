import ReactModal from 'react-modal';

import { FaCheck } from 'react-icons/fa';
import { MdOutlineCancel, MdOutlineDoubleArrow } from 'react-icons/md';

import { IConfirmRecreateRipoModal } from './types';
import { useEffect } from 'react';

const ConfirmRecreateRipoModal = ({
  modalConfirmRecreateIsOpen,
  setModalConfirmRecreateIsOpen,
  oldRipoImage,
  newRipoImage,
  loading,
  handleRecreateRipo,
}: IConfirmRecreateRipoModal) => {
  return (
    <ReactModal
      isOpen={modalConfirmRecreateIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          animation: 'modalFadeIn 0.5s ease-in-out',
        },
        content: {
          inset: '100px 150px',
          backgroundColor: '#242424',
          border: 'none',
          overflowY: 'scroll',
          padding: '0px',
        },
      }}
    >
      <div className="modalConfirmRecreateRipo">
        <h2>Você realmente deseja recriar o Ripo?</h2>

        <div className="riposImagesContainer">
          <img src={oldRipoImage} alt="" />
          <span>
            <MdOutlineDoubleArrow size={50} />
          </span>
          <img src={newRipoImage} alt="" />
        </div>

        <div className="buttonsContainer">
          <button type="button" onClick={handleRecreateRipo} disabled={loading}>
            <FaCheck size={15} /> Recriar
          </button>
          <button type="button" onClick={() => setModalConfirmRecreateIsOpen(false)}>
            <MdOutlineCancel size={20} /> Cancelar
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ConfirmRecreateRipoModal;
