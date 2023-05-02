import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import Character from '../../../../assets/images/Boneco_Ind.png';

import { BsCheck } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

import { api } from '../../../../services/api';
import { IAllRipos } from './types';

const ModalAddRipo = ({
  modalAddRipoIsOpen,
  setModalAddRipoIsOpen,
  setUserInformations,
  userInformations,
  getUserInformationsFunction,
}: any) => {
  const [allRipos, setAllRipos] = useState<IAllRipos[]>([]);
  const [newUserRipos, setNewUserRipos] = useState([]);

  useEffect(() => {
    const getAllRipos = async () => {
      try {
        const allRiposResponse = await api('/ripos/all');

        setAllRipos(allRiposResponse.data);
      } catch (err) {
        return toast.error('Ocorreu um erro ao buscar os ripos');
      }
    };

    getAllRipos();
  }, []);

  const selectRipoToEditFacFunction = (ripo: IAllRipos) => {
    let newUserRiposArray = Array.from(newUserRipos);

    const userAlreadyHaveThisRipo = userInformations.ripos.find((userRipo: IAllRipos) => userRipo.id === ripo.id);

    if (userAlreadyHaveThisRipo) {
      return toast.error('Usuário já possui esse Ripo');
    } else {
      newUserRiposArray.push(ripo);
      setNewUserRipos(newUserRiposArray);
    }
  };

  useEffect(() => {
    setNewUserRipos(userInformations.ripos);
  }, [modalAddRipoIsOpen == true]);

  const saveNewUserRipos = async () => {
    try {
      let newUserRiposIds = [] as string[];

      // Add just Ripos ids in array
      newUserRipos.forEach((userRipo: IAllRipos) => {
        newUserRiposIds.push(String(userRipo.id));
      });

      await api.post('/ripos/addUserRipos', { userId: userInformations.user.id, riposId: newUserRiposIds });

      setUserInformations({ ...userInformations, ripos: newUserRipos });

      toast.success('Você adicionou os Ripos ao usuário com sucesso');
      handleCloseAddRipoModal();
    } catch (err: any) {
      toast.error(err.message);
      getUserInformationsFunction();
      return handleCloseAddRipoModal();
    }
  };

  const handleCloseAddRipoModal = async () => {
    setModalAddRipoIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={modalAddRipoIsOpen}
      onRequestClose={handleCloseAddRipoModal}
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
          padding: '20px 0px',
        },
      }}
    >
      <div className="modalAddRipoContent">
        <header className="modalAddRipoHeader">
          <h1>Adicionar Ripos</h1>
          <button type="button" onClick={handleCloseAddRipoModal}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalAddRipoMain">
          <div className="modalAddRipoContainer" data-aos="fade-in" style={{ width: '100%' }}>
            <div className="modalAddRipoAllRipos" data-aos="fade-in">
              <h2>Escolher Ripos</h2>
              <div className="modalAddRipoRipos">
                {allRipos && allRipos.length > 0 ? (
                  allRipos.map((ripo, index) => (
                    <div
                      className={`ripo ${
                        ripo.rarity === 0
                          ? 'common'
                          : ripo.rarity === 1
                          ? 'unusual'
                          : ripo.rarity === 2
                          ? 'rare'
                          : 'legendary'
                      } ${
                        newUserRipos && newUserRipos.find((userRipo: IAllRipos) => userRipo.id === ripo.id)
                          ? 'selected'
                          : ''
                      }`}
                      key={index}
                      onClick={() => selectRipoToEditFacFunction(ripo)}
                    >
                      <img src={ripo.ripoImage} alt="" />
                      <p>{ripo.name}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ opacity: '0.5' }}>Usuário não possui ripos.</p>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="modalAddRipoFooter">
          <button type="button" onClick={saveNewUserRipos}>
            Salvar <BsCheck className="icon" />
          </button>
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalAddRipo;
