import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { BsCheck, BsCoin, BsTwitch, BsInstagram } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineExperiment } from 'react-icons/ai';

import { IModalEditUser } from './types';
import { api } from '../../../../services/api';

const ModalEditUser = ({ modalEditUserIsOpen, setModalEditUserIsOpen, userInformations }: IModalEditUser) => {
  const [userXp, setUserXp] = useState('');
  const [userCoins, setUserCoins] = useState('');
  const [userTwitch, setUserTwitch] = useState('');
  const [userInstagram, setUserInstagram] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserXp(userInformations.user && userInformations.user.xp);
    setUserCoins(userInformations.user && userInformations.user.coins);
    setUserTwitch(userInformations.user && userInformations.user.twitch);
    setUserInstagram(userInformations.user && userInformations.user.instagram);
  }, [userInformations]);

  const handleCloseModalEditUser = () => {
    setModalEditUserIsOpen(false);
  };

  const handleSaveUserInformations = async () => {
    setLoading(true);

    try {
      const saveUserInformationsResponse = await api.post('/admin/user/editUserBasicInformations', {
        userId: userInformations.user.id,
        xp: userXp ? userXp : null,
        coins: userCoins ? userCoins : null,
        twitch: userTwitch ? userTwitch : null,
        instagram: userInstagram ? userInstagram : null,
      });

      setLoading(false);
      handleCloseModalEditUser();
    } catch (err: any) {
      setLoading(false);
      handleCloseModalEditUser();
      toast.error(err.message);
    }
  };

  return (
    <ReactModal
      isOpen={modalEditUserIsOpen}
      onRequestClose={handleCloseModalEditUser}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          animation: 'modalFadeIn 0.5s ease-in-out',
        },
        content: {
          inset: '200px 400px',
          backgroundColor: '#242424',
          border: 'none',
          overflowY: 'scroll',
          padding: '20px 0px',
        },
      }}
    >
      <div className="modalEditProfileContent">
        <header className="modalEditProfileHeader">
          <h1>Editar usuário</h1>
          <button type="button" onClick={handleCloseModalEditUser}>
            <AiOutlineClose />
          </button>
        </header>

        <main className="modalEditProfileMain">
          <div className="inputContainer">
            <p>XP</p>
            <div className="inputAndIconContainer">
              <AiOutlineExperiment className="icon" />
              <input
                type="text"
                placeholder={userInformations.user && userInformations.user.xp}
                onChange={(e) => setUserXp(e.target.value)}
              />
            </div>
          </div>
          <div className="inputContainer">
            <p>COINS</p>
            <div className="inputAndIconContainer">
              <BsCoin className="icon" />
              <input
                type="text"
                placeholder={userInformations.user && userInformations.user.coins}
                onChange={(e) => setUserCoins(e.target.value)}
              />
            </div>
          </div>
          <div className="inputContainer">
            <p>TWITCH</p>
            <div className="inputAndIconContainer">
              <BsTwitch className="icon" />
              <input
                type="text"
                placeholder={userInformations.user && userInformations.user.twitch}
                onChange={(e) => setUserTwitch(e.target.value)}
              />
            </div>
          </div>
          <div className="inputContainer">
            <p>INSTAGRAM</p>
            <div className="inputAndIconContainer">
              <BsInstagram className="icon" />
              <input
                type="text"
                placeholder={userInformations.user && userInformations.user.instagram}
                onChange={(e) => setUserInstagram(e.target.value)}
              />
            </div>
          </div>
        </main>

        <footer className="modalEditProfileFooter">
          <button type="button" onClick={handleSaveUserInformations} disabled={loading}>
            Salvar <BsCheck className="icon" />
          </button>
        </footer>
      </div>
    </ReactModal>
  );
};

export default ModalEditUser;
