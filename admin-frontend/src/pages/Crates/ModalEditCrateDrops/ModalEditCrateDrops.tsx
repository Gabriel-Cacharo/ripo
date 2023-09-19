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
}: IModalEditCrateDrops) => {
  const [loading, setLoading] = useState(false);

  const [crateInformationsState, setCrateInformationsState] = useState({
    name: '',
    rarity: '',
    price: '',
    crateImage: '',
    canDropItems: false,
    canDropRipo: false,
    itemsDrop: '',
    riposDrop: [''],
    type: '',
  });
  const [allRipos, setAllRipos] = useState<IAllRipos[]>([]);

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
    if (crateInformations?.canDropRipo) {
      getAllRipos();
    } else if (crateInformations?.canDropItems) {
      console.log('itens');
    } else if (crateInformations?.canDropRipo && crateInformations?.canDropItems) {
      console.log('os dois');
    }

    setCrateInformationsState({
      name: crateInformations?.name as string,
      rarity: crateInformations?.rarity as any,
      price: crateInformations?.price as string,
      crateImage: crateInformations?.crateImage as string,
      canDropItems: crateInformations?.canDropItems as boolean,
      canDropRipo: crateInformations?.canDropRipo as boolean,
      itemsDrop: crateInformations?.itemsDrop as string,
      riposDrop:
        crateInformations && crateInformations.riposDrop.length > 0
          ? crateInformations?.riposDrop.replace('[', '').replace(']', '').split(',')
          : [''],
      type: crateInformations?.type as string,
    });
  }, [modalEditCrateDropsIsOpen === true]);

  const handleCloseModalEditCrateDrops = () => {
    setModalEditCrateDropsIsOpen(false);
  };

  // TODO: verificar entre cratesInformations & allRipos
  const selectRipoToEditFacFunction = (ripo: IAllRipos) => {
    let aa = newCrateRipos;

    const userAlreadyHaveThisRipo = aa.includes(ripo.id.toString());

    if (userAlreadyHaveThisRipo) {
      console.log('tem');
      return toast.error('Usuário já possui esse Ripo');
    } else {
      aa.push(ripo.id.toString());

      // console.log(aa);
      setNewCrateRipos(aa);
    }
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
      handleCloseModalEditCrateDrops();
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
          <div className="modalEditCrateDropsRipos">
            <h2>Escolher Ripos</h2>
            <div className="modalEditCrateDropsAllRipos">
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
                    } ${allRipos && allRipos.find((userRipo: IAllRipos) => userRipo.id === ripo.id) ? 'selected' : ''}`}
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
