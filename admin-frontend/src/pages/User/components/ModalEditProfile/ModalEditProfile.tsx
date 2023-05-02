import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import CharacterPaulo from '../../../../assets/images/Personagem2.png';
import Character from '../../../../assets/images/Boneco_Ind.png';
import CharacterNissin from '../../../../assets/images/Personagem1.png';

import { BsCheck } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import { api } from '../../../../services/api';

const ModalEditProfile = ({
  modalEditProfileIsOpen,
  setModalEditProfileIsOpen,
  userRiposAlreadyOnFac,
  setUserInformations,
  userInformations,
  setAlreadyRiposOnFac,
  getUserInformationsFunction,
}) => {
  const [pageModalEditProfile, setPageModalEditProfile] = useState('Select');

  const [newFacName, setNewFacName] = useState('');
  const [newRiposInFac, setNewRiposInFac] = useState([]);

  useEffect(() => {
    setNewRiposInFac(userRiposAlreadyOnFac);
  }, [pageModalEditProfile]);

  const selectRipoToEditFacFunction = (ripo) => {
    let newFacRiposArray = Array.from(newRiposInFac);

    const facAlreadyHaveThisRipo = newFacRiposArray.find((facRipo) => facRipo.id === ripo.id);
    const facAlreadyHaveThisRipoIndex = newFacRiposArray.indexOf(facAlreadyHaveThisRipo);

    if (facAlreadyHaveThisRipo) {
      // Remove ripo from fac
      newFacRiposArray.splice(facAlreadyHaveThisRipoIndex, 1);
      setNewRiposInFac(newFacRiposArray);
    } else {
      // Add ripo in fac
      if (newFacRiposArray.length >= 8) {
        return toast.error('Você não pode colocar mais Ripos na facção');
      }

      newFacRiposArray.push(ripo);
      setNewRiposInFac(newFacRiposArray);
    }
  };

  const saveNewUserFacRipos = async () => {
    try {
      let newFacRiposIds = [];

      // Add just Ripos ids in array
      newRiposInFac.forEach((facRipo) => {
        newFacRiposIds.push(String(facRipo.id));
      });

      await api.post('/user/updateFacRipos', { facRipos: newFacRiposIds, facName: newFacName });

      setUserInformations({ ...userInformations, user: { fac: newFacName }, facRipos: newRiposInFac });
      setAlreadyRiposOnFac(newRiposInFac);

      toast.success('Você alterou sua facção com sucesso');
      handleCloseModalEditProfile();
    } catch (err) {
      toast.error(err.message);
      getUserInformationsFunction();
      return handleCloseModalEditProfile();
    }
  };

  const handleCloseModalEditProfile = async () => {
    setModalEditProfileIsOpen(false);
    setPageModalEditProfile('Select');
  };

  return (
    <ReactModal
      isOpen={modalEditProfileIsOpen}
      onRequestClose={handleCloseModalEditProfile}
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
      <div className="modalEditProfileContent">
        <header className="modalEditProfileHeader">
          {pageModalEditProfile === 'Select' ? <h1>Editar perfil</h1> : <h1>Editar facção</h1>}
          <button type="button" onClick={handleCloseModalEditProfile}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalEditProfileMain">
          {pageModalEditProfile === 'Select' && (
            <div className="modalEditProfileActionsContainer">
              <button className="actionContainer" data-aos="fade-in" onClick={() => setPageModalEditProfile('EditFac')}>
                <div className="actionImage">
                  <img src={CharacterNissin} alt="" />
                </div>
                <h4>
                  <BiRefresh className="icon" /> Alterar minha facção
                </h4>
              </button>
              <button className="actionContainer" data-aos="fade-in">
                <div className="actionImage">
                  <img src={CharacterPaulo} alt="" />
                </div>
                <h4>
                  <BiRefresh className="icon" /> Em breve
                </h4>
              </button>
            </div>
          )}

          {pageModalEditProfile === 'EditFac' && (
            <div className="modalEditProfileUserFacInformationsContainer" data-aos="fade-in" style={{ width: '100%' }}>
              <div className="modalEditProfileUserFacInformations">
                <div className="userFacInformations" data-aos="fade-down-right">
                  <img src={Character} alt="" />
                  <div className="textsContainer">
                    <p>Sua coleção:</p>
                    <h3>
                      30/<span>782</span>
                    </h3>
                  </div>
                </div>

                <div className="userFacInformations" data-aos="fade-down-left">
                  <img src={Character} alt="" />
                  <div className="textsContainer">
                    <p>Máx de ripos na fac:</p>
                    <h3>8</h3>
                  </div>
                </div>
              </div>

              <div className="modalEditProfileUserFacName" data-aos="fade-in">
                <h2>Alterar nome da facção</h2>
                <input
                  type="text"
                  placeholder="Digite o nome da sua facção"
                  onChange={(e) => setNewFacName(e.target.value)}
                />
              </div>

              <div className="modalEditProfileUserFacRipos" data-aos="fade-in">
                <h2>Escolher Ripos</h2>
                <div className="modalEditProfileUserRipos">
                  {userInformations.ripos && userInformations.ripos.length > 0 ? (
                    userInformations.ripos.map((ripo, index) => (
                      <div
                        className={`userRipo ${
                          ripo.rarity === 0
                            ? 'common'
                            : ripo.rarity === 1
                            ? 'unusual'
                            : ripo.rarity === 2
                            ? 'rare'
                            : 'legendary'
                        } ${newRiposInFac.find((facRipo) => facRipo.id === ripo.id) ? 'selected' : ''}`}
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
          )}
        </main>

        <footer className="modalEditProfileFooter">
          {pageModalEditProfile !== 'Select' && (
            <button type="button" onClick={saveNewUserFacRipos}>
              Salvar <BsCheck className="icon" />
            </button>
          )}
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalEditProfile;
