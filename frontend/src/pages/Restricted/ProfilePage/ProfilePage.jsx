import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ReactModal from 'react-modal';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import Character from '../../../assets/images/Boneco_Ind.png';
import CharacterNissin from '../../../assets/images/Personagem1.png';
import Car from '../../../assets/images/Carro_Ind1.png';
import Gun from '../../../assets/images/Arma_Ind1.png';
import Knife from '../../../assets/images/Arma_Ind2.png';

import { AiFillStar, AiOutlineClose } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import { MdEdit } from 'react-icons/md';

import { api } from '../../../services/api';

const FactionPage = () => {
  const { username } = useParams();
  const userLocalStorageInformations = localStorage.getItem('user');

  const [userInformations, setUserInformations] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [searchingOtherUser, setSearchingOtherUser] = useState(false);

  const [modalEditProfileIsOpen, setModalEditProfileIsOpen] = useState(false);

  const searchProfileFunction = async (username) => {
    try {
      if (!username) {
        return getUserInformationsFunction();
      }

      const userInformationsResponse = await api(`/user/searchProfile?username=${username}`);

      setUserInformations(userInformationsResponse.data);
      setSearchingOtherUser(true);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const getUserInformationsFunction = async () => {
    try {
      // If route has username, search profile;
      if (username) {
        await searchProfileFunction(username);
      } else {
        // If route hasn't username, get user profile;
        const userInformationsResponse = await api(
          `/user/profile?userId=${JSON.parse(userLocalStorageInformations).id}`
        );

        setUserInformations(userInformationsResponse.data);
        setSearchingOtherUser(false);
      }
    } catch (err) {
      setUserInformations([]);
    }
  };

  useEffect(() => {
    getUserInformationsFunction();
  }, []);

  return (
    <div className="factionPageContainer">
      <ReactModal
        isOpen={modalEditProfileIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            inset: '100px 150px',
            backgroundColor: '#242424',
            border: 'none',
            overflowY: 'scroll',
          },
        }}
      >
        <div className="modalEditProfileContent">
          <header className="modalEditProfileHeader">
            <h1>Editar perfil</h1>
            <button>
              <AiOutlineClose />
            </button>
          </header>
          <main className="modalEditProfileMain">
            <div className="modalEditProfileUserFacName">
              <h2>Alterar nome da facção</h2>
              <input type="text" placeholder="Digite o nome da sua facção" />
            </div>

            <div className="modalEditProfileUserFacRipos">
              <h2>Alterar ripos da minha facção</h2>
              <div className="modalEditProfileUserRipos">
                {userInformations.ripos && userInformations.ripos.length > 0 ? (
                  userInformations.ripos.map((ripo, index) => (
                    <div className="userRipo" key={index}>
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
        </div>
      </ReactModal>

      <div className="facNameAndOwnerInformations">
        <div className="sectionTitleAndSearchInput">
          <SectionTitle
            title={userInformations.user && userInformations.user.fac ? userInformations.user.fac : 'Sem fac'}
            secondPart="."
          />

          <div className="inputSearchContainer">
            <input type="text" placeholder="Procure um usuário" onChange={(e) => setUsernameInput(e.target.value)} />
            <button className="searchButton" onClick={() => searchProfileFunction(usernameInput)}>
              <GoSearch className="icon" />
            </button>
            {!searchingOtherUser && (
              <button type="button" onClick={(prevState) => setModalEditProfileIsOpen(!!prevState)}>
                <MdEdit className="icon" />
              </button>
            )}
          </div>
        </div>

        <h5>{userInformations.user && userInformations.user.username}</h5>
      </div>

      <section className="facMembersInformationContainer">
        <div className="facOwnerImage" data-aos="fade-in">
          <img src={userInformations.profileRipo || CharacterNissin} alt="User Ripo" />
        </div>

        <div className="facMembersContainer" data-aos="zoom-out">
          <h4>
            MEMBROS <span>{userInformations.facRipos && userInformations.facRipos.length}/</span>
            <p>20</p>
          </h4>

          <div className="membersContainer">
            {userInformations.facRipos && userInformations.facRipos.length > 0 ? (
              userInformations.facRipos.map((ripo, index) => (
                <div className="memberContainer" key={index}>
                  <img src={ripo.ripoImage} alt="" />
                  <p>{ripo.name}</p>
                </div>
              ))
            ) : (
              <p style={{ opacity: '0.5' }}>A facção do usuário não possui membros.</p>
            )}
          </div>
        </div>
      </section>

      <section className="facInformationsContainer">
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Carro <AiFillStar className="icon" />
          </h4>
          <img src={Car} alt="" />
          <p>{userInformations.favoriteCar ? userInformations.favoriteCar : 'Nenhum'}</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma <AiFillStar className="icon" />
          </h4>
          <img src={Gun} alt="" />
          <p>{userInformations.favoriteGun ? userInformations.favoriteGun : 'Nenhuma'}</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma Sec. <AiFillStar className="icon" />
          </h4>
          <img src={Knife} alt="" />
          <p>{userInformations.favoriteSecondaryGun ? userInformations.favoriteSecondaryGun : 'Nenhuma'}</p>
        </div>
      </section>

      <section className="facCollectionContainer">
        <h4>
          COLEÇÃO <span>{userInformations.ripos && userInformations.ripos.length}/</span>
          <p>782</p>
        </h4>

        <div className="collectionContainer" data-aos="zoom-out">
          {userInformations.ripos && userInformations.ripos.length > 0 ? (
            userInformations.ripos.map((ripo, index) => (
              <div className="itemCollection" key={index}>
                <img src={ripo.ripoImage} alt="" />
                <p>{ripo.name}</p>
              </div>
            ))
          ) : (
            <p style={{ opacity: '0.5' }}>Usuário não possui ripos.</p>
          )}
        </div>
      </section>

      <section className="facGunsContainer">
        <h4>
          ARMAS <span>{userInformations.guns ? userInformations.guns.length : '0'}/</span>
          <p>52</p>
        </h4>

        <div className="gunsContainer" data-aos="zoom-out">
          {userInformations.guns && userInformations.guns.length > 0 ? (
            <div className="gunItem">
              <img src={Gun} alt="" />
              <p>AK-47</p>
            </div>
          ) : (
            <p style={{ opacity: '0.5' }}>Usuário não possui armas.</p>
          )}
        </div>
      </section>

      <section className="facCarsContainer">
        <h4>
          CARROS <span>{userInformations.cars ? userInformations.cars.length : '0'}/</span>
          <p>120</p>
        </h4>

        <div className="carsContainer" data-aos="zoom-out">
          {userInformations.cars && userInformations.cars.length > 0 ? (
            <div className="carItem">
              <img src={Car} alt="" />
              <p>SKYLINE R34</p>
            </div>
          ) : (
            <p style={{ opacity: '0.5' }}>Usuário não possui carros.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FactionPage;
