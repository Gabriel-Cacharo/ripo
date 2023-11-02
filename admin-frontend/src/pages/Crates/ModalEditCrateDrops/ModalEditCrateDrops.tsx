import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { BsCheck } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

import { IModalEditCrateDrops } from './types';
import { IAllRipos } from '../../User/components/ModalAddRipo/types';

import { api } from '../../../services/api';

const ModalEditCrateDrops = ({
  modalEditCrateDropsIsOpen,
  setModalEditCrateDropsIsOpen,
  crateInformations,
  getCratesInformationsFunction,
  setModalEditCrateIsOpen,
}: IModalEditCrateDrops) => {
  const [loading, setLoading] = useState(false);

  const [crateInformationsState, setCrateInformationsState] = useState({
    id: 0,
    canDropItems: false,
    canDropRipo: false,
    itemsDrop: '',
    riposDrop: [''],
  });
  const [allRipos, setAllRipos] = useState<IAllRipos[]>([]);
  const [newCrateRiposDrop, setNewCrateRiposDrop] = useState<string[]>([]);

  // const [newCrateItemsDrop, setNewCrateItemsDrop] = useState<string[]>([]);

  const getAllRipos = async () => {
    try {
      const allRiposResponse = await api('/ripos/all');

      setAllRipos(allRiposResponse.data);
    } catch (err) {
      return toast.error('Ocorreu um erro ao buscar os ripos');
    }
  };

  // TODO: inverter o último else if para o primeiro if
  useEffect(() => {
    if (crateInformations?.canDropRipo && crateInformations?.canDropItems) {
      // getAllRipos();
      // getAllItens()
      // return;
    } else if (crateInformations?.canDropItems) {
      // getAllItens()
      // return;
    } else if (crateInformations?.canDropRipo) {
      getAllRipos();
    }

    setCrateInformationsState({
      id: crateInformations?.id as number,
      canDropItems: crateInformations?.canDropItems as boolean,
      canDropRipo: crateInformations?.canDropRipo as boolean,
      itemsDrop: crateInformations?.itemsDrop as string,
      riposDrop:
        crateInformations && crateInformations.riposDrop.length > 0
          ? crateInformations?.riposDrop.replace('[', '').replace(']', '').split(',')
          : [''],
    });

    setNewCrateRiposDrop(crateInformations?.riposDrop.replace('[', '').replace(']', '').split(',') as string[]);
  }, [modalEditCrateDropsIsOpen === true]);

  const handleCloseModalEditCrateDrops = () => {
    setModalEditCrateDropsIsOpen(false);
  };

  const selectRipoToEditFacFunction = (ripo: IAllRipos) => {
    let newCrateRiposDropArray = [...newCrateRiposDrop];
    const userAlreadyHaveThisRipo = newCrateRiposDropArray?.includes(ripo.id.toString());

    if (userAlreadyHaveThisRipo) {
      const ripoIndex = newCrateRiposDropArray?.findIndex(
        (newCrateRipo) => newCrateRipo.toString() === ripo.id.toString()
      );

      newCrateRiposDropArray?.splice(ripoIndex, 1);
      setNewCrateRiposDrop(newCrateRiposDropArray);
    } else {
      newCrateRiposDropArray?.push(ripo.id.toString());
      setNewCrateRiposDrop(newCrateRiposDropArray);
    }
  };

  const handleSaveRipoInformations = async () => {
    setLoading(true);

    try {
      await api.put('/admin/crates/editCrateDrops', {
        id: crateInformations?.id,
        canDropItems: crateInformationsState?.canDropItems as boolean,
        canDropRipo: crateInformationsState?.canDropRipo as boolean,
        itemsDrop: crateInformationsState?.itemsDrop as string,
        riposDrop: `[${newCrateRiposDrop}]`,
      });

      toast.success('As informações da Caixa foram alteradas com sucesso!');
      getCratesInformationsFunction();
      setLoading(false);
      handleCloseModalEditCrateDrops();
      setModalEditCrateIsOpen(false);
    } catch (err: any) {
      toast.error(err.response.data.error);
      setLoading(false);
      handleCloseModalEditCrateDrops();
    }
  };

  return (
    <ReactModal
      isOpen={modalEditCrateDropsIsOpen}
      onRequestClose={handleCloseModalEditCrateDrops}
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
      <div className="modalEditCrateDropsContent">
        <header className="modalEditCrateDropsHeader">
          <h1>Editar Drops da Caixa</h1>
          <button type="button" onClick={handleCloseModalEditCrateDrops}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalEditCrateDropsMain">
          {crateInformations?.canDropRipo && (
            <div className="modalEditCrateDropsContainer">
              <h2>Escolher Ripos</h2>
              <div className="modalEditCrateAllDropsContainer">
                {allRipos && allRipos.length > 0 ? (
                  allRipos.map((ripo, index) => (
                    <div
                      className={`drop ${
                        ripo.rarity === 0
                          ? 'common'
                          : ripo.rarity === 1
                          ? 'unusual'
                          : ripo.rarity === 2
                          ? 'rare'
                          : 'legendary'
                      } ${
                        newCrateRiposDrop && newCrateRiposDrop.find((newRipoDrop) => newRipoDrop === ripo.id.toString())
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
          )}

          {crateInformations?.canDropItems && (
            <div className="modalEditCrateDropsContainer" style={{ marginTop: '20px' }}>
              <h2>Escolher Itens</h2>
              <div className="modalEditCrateAllDropsContainer">
                {/* TODO: Change to ITEMS */}
                {/* {allRipos && allRipos.length > 0 ? (
                  allRipos.map((ripo, index) => (
                    <div
                      className={`drop ${
                        ripo.rarity === 0
                          ? 'common'
                          : ripo.rarity === 1
                          ? 'unusual'
                          : ripo.rarity === 2
                          ? 'rare'
                          : 'legendary'
                      } ${
                        newCrateRiposDrop && newCrateRiposDrop.find((newRipoDrop) => newRipoDrop === ripo.id.toString())
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
                )} */}
              </div>
            </div>
          )}
        </main>

        <footer className="modalEditCrateDropsFooter">
          <button type="button" onClick={handleCloseModalEditCrateDrops} disabled={loading}>
            Cancelar <MdCancel className="icon" />
          </button>
          <button type="submit" onClick={handleSaveRipoInformations} disabled={loading}>
            Salvar <BsCheck className="icon" />
          </button>
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalEditCrateDrops;
