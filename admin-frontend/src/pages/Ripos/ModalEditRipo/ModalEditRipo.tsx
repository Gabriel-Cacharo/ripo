import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { BsCheck, BsStar, BsCoin } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPublic, MdEdit } from 'react-icons/md';

import { IModalEditRipo } from './types';
import { api } from '../../../services/api';

const ModalEditRipo = ({
  modalEditRipoIsOpen,
  setModalEditRipoIsOpen,
  ripoInformations,
  getRiposInformationsFunction,
}: IModalEditRipo) => {
  const [loading, setLoading] = useState(false);

  const [ripoInformationsState, setRipoInformationsState] = useState({
    name: '',
    rarity: '',
    price: '',
    ripoImage: '',
    public: false,
  });

  useEffect(() => {
    setRipoInformationsState({
      name: ripoInformations?.name as string,
      rarity: ripoInformations?.rarity as any,
      price: ripoInformations?.price as string,
      ripoImage: ripoInformations?.ripoImage as string,
      public: ripoInformations?.public ? ripoInformations?.public : false,
    });
  }, [modalEditRipoIsOpen === true]);

  const handleCloseModalEditRipo = () => {
    setModalEditRipoIsOpen(false);
  };

  const handleSaveRipoInformations = async () => {
    setLoading(true);

    try {
      api.put('/admin/ripos/editRipoBasicInformations', {
        ripoId: ripoInformations?.id,
        rarity: ripoInformationsState?.rarity,
        name: ripoInformationsState?.name,
        price: ripoInformationsState?.price,
        ripoImage: ripoInformationsState?.ripoImage,
        public: ripoInformationsState?.public,
      });

      toast.success('As informações do Ripo foram alteradas com sucesso!');
      getRiposInformationsFunction();
      setLoading(false);
      handleCloseModalEditRipo();
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
      handleCloseModalEditRipo();
    }
  };

  return (
    <ReactModal
      isOpen={modalEditRipoIsOpen}
      onRequestClose={handleCloseModalEditRipo}
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
      <div className="modalEditRipoContent">
        <header className="modalEditRipoHeader">
          <h1>Editar Ripo</h1>
          <button type="button" onClick={handleCloseModalEditRipo}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalEditRipoMain">
          <div className="leftInformationsContainer">
            <div className="ripoImage">
              <img src={ripoInformations?.ripoImage} alt="Ripo Image" />
            </div>
            <h4>{ripoInformations?.name}</h4>
          </div>

          <div className="rightInformationsContainer">
            <div className="ripoInformationsContainer">
              <div className="informationContainer">
                <BsStar className="icon" />
                <p>
                  {ripoInformations?.rarity === 0
                    ? 'Comum'
                    : ripoInformations?.rarity === 1
                    ? 'Incomum'
                    : ripoInformations?.rarity === 2
                    ? 'Raro'
                    : 'Lendário'}
                </p>
              </div>

              <div className="informationContainer">
                <BsCoin className="icon" />
                <p>{ripoInformations?.price}</p>
              </div>

              <div className="informationContainer">
                <MdPublic className="icon" />
                <p>{ripoInformations?.public ? ripoInformations.public.toString() : 'false'}</p>
              </div>
            </div>

            <div className="inputsContainer">
              <div className="inputContainer">
                <p>Nome</p>
                <input
                  type="text"
                  placeholder={ripoInformationsState.name}
                  onChange={(e) => setRipoInformationsState({ ...ripoInformations, name: e.target.value } as any)}
                />
              </div>

              <div className="inputContainer">
                <p>Preço</p>
                <input
                  type="text"
                  placeholder={ripoInformationsState.price}
                  onChange={(e) => setRipoInformationsState({ ...ripoInformations, price: e.target.value } as any)}
                />
              </div>
            </div>

            <div className="inputContainer">
              <p>Imagem</p>
              <input
                type="text"
                placeholder={ripoInformationsState.ripoImage}
                onChange={(e) => setRipoInformationsState({ ...ripoInformations, ripoImage: e.target.value } as any)}
              />
            </div>

            <div className="inputsContainer">
              <div className="inputContainer">
                <p>Raridade</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setRipoInformationsState({ ...ripoInformations, rarity: e.target.value } as any)}
                >
                  <option value="0">Comum</option>
                  <option value="1">Incomum</option>
                  <option value="2">Raro</option>
                  <option value="3">Lendário</option>
                </select>
              </div>

              <div className="inputContainer">
                <p>Público</p>
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    setRipoInformationsState({
                      ...ripoInformationsState,
                      public: e.target.value === 'true' ? true : false,
                    })
                  }
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>
            </div>
          </div>
        </main>

        <footer className="modalEditRipoFooter">
          <button type="button" onClick={handleSaveRipoInformations} disabled={true}>
            Ir para edição <MdEdit className="icon" />
          </button>
          <button type="submit" onClick={handleSaveRipoInformations} disabled={loading}>
            Salvar <BsCheck className="icon" />
          </button>
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalEditRipo;
