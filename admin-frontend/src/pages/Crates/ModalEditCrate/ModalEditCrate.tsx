import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { BsCheck, BsStar, BsCoin } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPublic, MdEdit } from 'react-icons/md';

import { IModalEditCrate } from './types';
import { api } from '../../../services/api';

const ModalEditCrate = ({
  modalEditCrateIsOpen,
  setModalEditCrateIsOpen,
  setModalEditCrateDropsOpen,
  crateInformations,
  getCratesInformationsFunction,
}: IModalEditCrate) => {
  const [loading, setLoading] = useState(false);

  const [crateInformationsState, setCrateInformationsState] = useState({
    name: '',
    rarity: '',
    price: '',
    crateImage: '',
    canDropItems: false,
    canDropRipo: false,
    itemsDrop: '',
    riposDrop: '',
    type: '',
  });

  useEffect(() => {
    setCrateInformationsState({
      name: crateInformations?.name as string,
      rarity: crateInformations?.rarity as any,
      price: crateInformations?.price as string,
      crateImage: crateInformations?.crateImage as string,
      canDropItems: crateInformations?.canDropItems as boolean,
      canDropRipo: crateInformations?.canDropRipo as boolean,
      itemsDrop: crateInformations?.itemsDrop as string,
      riposDrop: crateInformations?.riposDrop as string,
      type: crateInformations?.type as string,
    });
  }, [modalEditCrateIsOpen === true]);

  const handleCloseModalEditCrate = () => {
    setModalEditCrateIsOpen(false);
  };

  const handleSaveRipoInformations = async () => {
    setLoading(true);

    try {
      await api.put('/admin/crates/editCrateBasicInformations', {
        crateId: crateInformations?.id,
        rarity: crateInformationsState?.rarity,
        name: crateInformationsState?.name,
        price: crateInformationsState?.price,
        crateImage: crateInformationsState?.crateImage,
        canDropItems: crateInformationsState?.canDropItems as boolean,
        canDropRipo: crateInformationsState?.canDropRipo as boolean,
        itemsDrop: crateInformationsState?.itemsDrop as string,
        riposDrop: crateInformationsState?.riposDrop as string,
        type: crateInformationsState?.type as string,
      });

      toast.success('As informações da Caixa foram alteradas com sucesso!');
      getCratesInformationsFunction();
      setLoading(false);
      handleCloseModalEditCrate();
    } catch (err: any) {
      toast.error(err.response.data.error);
      setLoading(false);
      handleCloseModalEditCrate();
    }
  };

  return (
    <>
      <ReactModal
        isOpen={modalEditCrateIsOpen}
        onRequestClose={handleCloseModalEditCrate}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            animation: 'modalFadeIn 0.5s ease-in-out',
          },
          content: {
            inset: '150px 400px',
            backgroundColor: '#242424',
            border: 'none',
            overflowY: 'scroll',
            padding: '20px 0px',
          },
        }}
      >
        <div className="modalEditCrateContent">
          <header className="modalEditCrateHeader">
            <h1>Editar Caixa</h1>
            <button type="button" onClick={handleCloseModalEditCrate}>
              <AiOutlineClose />
            </button>
          </header>

          <main className="modalEditCrateMain">
            <div className="leftInformationsContainer">
              <div className="crateImage">
                <img src={crateInformations?.crateImage} alt="Crate Image" />
              </div>
              <h4>{crateInformations?.name}</h4>
            </div>

            <div className="rightInformationsContainer">
              <div className="crateInformationsContainer">
                <div className="informationContainer">
                  <BsStar className="icon" />
                  <p>
                    {crateInformations?.rarity === 0
                      ? 'Comum'
                      : crateInformations?.rarity === 1
                      ? 'Incomum'
                      : crateInformations?.rarity === 2
                      ? 'Raro'
                      : 'Lendário'}
                  </p>
                </div>

                <div className="informationContainer">
                  <BsCoin className="icon" />
                  <p>{crateInformations?.price}</p>
                </div>
              </div>

              <div className="inputsContainer">
                <div className="inputContainer">
                  <p>Nome</p>
                  <input
                    type="text"
                    placeholder={crateInformationsState.name}
                    onChange={(e) => setCrateInformationsState({ ...crateInformations, name: e.target.value } as any)}
                  />
                </div>

                <div className="inputContainer">
                  <p>Preço</p>
                  <input
                    type="text"
                    placeholder={crateInformationsState.price}
                    onChange={(e) => setCrateInformationsState({ ...crateInformations, price: e.target.value } as any)}
                  />
                </div>
              </div>

              <div className="inputsContainer">
                <div className="inputContainer">
                  <p>Imagem</p>
                  <input
                    type="text"
                    placeholder={crateInformationsState.crateImage}
                    onChange={(e) =>
                      setCrateInformationsState({ ...crateInformations, crateImage: e.target.value } as any)
                    }
                  />
                </div>

                <div className="inputContainer">
                  <p>Raridade</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setCrateInformationsState({ ...crateInformations, rarity: e.target.value } as any)}
                  >
                    <option value="0">Comum</option>
                    <option value="1">Incomum</option>
                    <option value="2">Raro</option>
                    <option value="3">Lendário</option>
                  </select>
                </div>
              </div>

              <div className="inputsContainer">
                <div className="inputContainer">
                  <p>Drop Itens</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      setCrateInformationsState({ ...crateInformations, canDropItems: e.target.value } as any)
                    }
                  >
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </select>
                </div>
                <div className="inputContainer">
                  <p>Drop Ripo</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      setCrateInformationsState({ ...crateInformations, canDropRipo: e.target.value } as any)
                    }
                  >
                    <option value="0">Não</option>
                    <option value="1">Sim</option>
                  </select>
                </div>
              </div>
            </div>
          </main>

          <footer className="modalEditCrateFooter">
            <button type="button" onClick={setModalEditCrateDropsOpen}>
              Editar drops <MdEdit className="icon" />
            </button>
            <button type="submit" onClick={handleSaveRipoInformations} disabled={loading}>
              Salvar <BsCheck className="icon" />
            </button>
          </footer>
        </div>
      </ReactModal>
    </>
  );
};

export default ModalEditCrate;
