import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import { api } from '../../../../services/api';
import { IAllCrates } from './types';

const ModalAddCrate = ({
  modalAddCrateIsOpen,
  setModalAddCrateIsOpen,
  setUserInformations,
  userInformations,
  getUserInformationsFunction,
}: any) => {
  const [allCrates, setAllCrates] = useState<IAllCrates[]>([]);
  const [newUserCrates, setNewUserCrates] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getAllCrates = async () => {
      try {
        const allCratesResponse = await api('/admin/crates/all');

        setAllCrates(allCratesResponse.data);
      } catch (err) {
        return toast.error('Ocorreu um erro ao buscar as caixas');
      }
    };

    getAllCrates();
  }, []);

  const addUserCrate = async (crate: IAllCrates) => {
    try {
      await api.post('/admin/crates/add', {
        userId: userInformations.user.id,
        crateId: crate.id,
      });

      toast.success('A caixa foi adicionada ao usuário com sucesso');
      getUserInformationsFunction();
    } catch (err) {
      return toast.error('Ocorreu um erro ao adicionar a caixa ao usuário');
    }
  };

  useEffect(() => {
    setNewUserCrates(userInformations?.user?.crates);
  }, [modalAddCrateIsOpen == true]);

  const handleRenderCrates = () => {
    const allCratesFiltered = allCrates.filter((crate) => crate.name.toLowerCase().includes(searchValue.toLowerCase()));

    return searchValue ? (
      allCratesFiltered.map((crate, index) => (
        <div
          className={`crate ${
            crate.rarity === 0 ? 'common' : crate.rarity === 1 ? 'unusual' : crate.rarity === 2 ? 'rare' : 'legendary'
          }`}
          key={index}
          onClick={() => addUserCrate(crate)}
        >
          <img src={crate.crateImage} alt={crate.name} />
          <p>{crate.name}</p>
        </div>
      ))
    ) : allCrates && allCrates.length > 0 ? (
      allCrates.map((crate, index) => (
        <div
          className={`crate ${
            crate.rarity === 0 ? 'common' : crate.rarity === 1 ? 'unusual' : crate.rarity === 2 ? 'rare' : 'legendary'
          }`}
          key={index}
          onClick={() => addUserCrate(crate)}
        >
          <img src={crate.crateImage} alt={crate.name} />
          <p>{crate.name}</p>
        </div>
      ))
    ) : (
      <p style={{ opacity: '0.5' }}>Nenhuma caixa encontrada.</p>
    );
  };

  useEffect(() => {
    handleRenderCrates();
  }, [searchValue]);

  return (
    <ReactModal
      isOpen={modalAddCrateIsOpen}
      onRequestClose={() => setModalAddCrateIsOpen(false)}
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
      <div className="modalAddCrateContent">
        <header className="modalAddCrateHeader">
          <h1>Adicionar Caixas</h1>
          <button type="button" onClick={() => setModalAddCrateIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalAddCrateMain">
          <div className="modalAddCrateContainer" data-aos="fade-in" style={{ width: '100%' }}>
            <div className="searchInput">
              <input type="text" placeholder="Procure uma caixa" onChange={(e) => setSearchValue(e.target.value)} />
              <button>
                <AiOutlineSearch />
              </button>
            </div>

            <div className="modalAddCrateAllCrates" data-aos="fade-in">
              <h2>Escolher Caixas</h2>
              <div className="modalAddCrateCrates">{handleRenderCrates()}</div>
            </div>
          </div>
        </main>

        <footer className="modalAddCrateFooter">
          <button type="button" onClick={() => setModalAddCrateIsOpen(false)}>
            Fechar <AiOutlineClose className="icon" />
          </button>
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalAddCrate;
