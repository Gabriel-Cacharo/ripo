import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import CollectionCharacter from '../../components/CollectionCharacter/CollectionCharacter';

import CharacterNissin from '../../assets/images/Personagem1.png';
import Car from '../../assets/images/Carro_Ind1.png';
import Gun from '../../assets/images/Arma_Ind1.png';
import Knife from '../../assets/images/Arma_Ind2.png';

import { AiFillStar, AiOutlineExperiment } from 'react-icons/ai';
import { MdAdd, MdEdit } from 'react-icons/md';
import { BsCoin } from 'react-icons/bs';

import { api } from '../../services/api';
import { IUser } from './types';

import ModalAddRipo from './components/ModalAddRipo/ModalAddRipo';
import ModalEditUser from './components/ModalEditProfile/ModalEditProfile';

const UserPage = () => {
  const { username } = useParams();
  const userLocalStorageInformations = localStorage.getItem('user');

  const [userInformations, setUserInformations] = useState<IUser>({} as IUser);

  const [userRiposInFac, setUserRiposInFac] = useState([]);

  const [modalAddRipoIsOpen, setModalAddRipoIsOpen] = useState(false);
  const [modalEditUserIsOpen, setModalEditUserIsOpen] = useState(false);

  const searchProfileFunction = async (username: any) => {
    try {
      if (!username) {
        return getUserInformationsFunction();
      }

      const userInformationsResponse = await api(`/user/searchProfile?username=${username}`);

      setUserInformations(userInformationsResponse.data);
    } catch (err: any) {
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
          `/user/profile?userId=${JSON.parse(userLocalStorageInformations!).id}`
        );

        setUserInformations(userInformationsResponse.data);
        setUserRiposInFac(userInformationsResponse.data.facRipos);
      }
    } catch (err) {
      setUserInformations({} as IUser);
    }
  };

  useEffect(() => {
    getUserInformationsFunction();
  }, []);

  // Set new ripos on fac from modal
  const setAlreadyRiposOnFac = (ripos: any) => {
    setUserRiposInFac(ripos);
  };

  const removeUserRipoFunction = async (ripoId: number) => {
    try {
      const removeUserRipoResponse = await api.post(`/users/removeRipo`, { userId: userInformations?.user.id, ripoId });

      const ripoIndexArray = userInformations?.ripos.findIndex((r) => r.id === ripoId);
      userInformations?.ripos.splice(ripoIndexArray!, 1);

      setUserInformations({ ...(userInformations as IUser), ripos: userInformations?.ripos as any });
    } catch (err) {
      return toast.error('Ocorreu um erro ao remover o Ripo do usuário');
    }
  };

  return (
    <div className="factionPageContainer">
      <ModalEditUser
        modalEditUserIsOpen={modalEditUserIsOpen}
        setModalEditUserIsOpen={setModalEditUserIsOpen}
        userInformations={userInformations}
      />

      <ModalAddRipo
        modalAddRipoIsOpen={modalAddRipoIsOpen}
        setModalAddRipoIsOpen={setModalAddRipoIsOpen}
        setUserInformations={setUserInformations}
        userInformations={userInformations}
        getUserInformationsFunction={getUserInformationsFunction}
      />

      <div className="userHeaderInformationsContainer">
        <div className="facNameAndOwnerInformations">
          <SectionTitle
            title={userInformations?.user && userInformations.user.fac ? userInformations.user.fac : 'Sem fac'}
            secondPart="."
          />

          <div className="usernameAndNetworksContainer">
            <h5>{userInformations?.user && userInformations.user.username}</h5>
            <button type="button" onClick={() => setModalEditUserIsOpen(true)}>
              <MdEdit className="icon" />
            </button>
          </div>
        </div>

        <div className="userInformationsContainer">
          <div className="userInformation">
            <AiOutlineExperiment className="icon" />
            <p>{userInformations.user && userInformations.user.xp}</p>
          </div>

          <div className="userInformation">
            <BsCoin className="icon" />
            <p>{userInformations.user && userInformations.user.coins}</p>
          </div>
        </div>
      </div>

      <section className="facMembersInformationContainer">
        <div className="facOwnerImage" data-aos="zoom-in">
          <img src={userInformations?.profileRipo || CharacterNissin} alt="User Ripo" />
        </div>

        <div className="facMembersContainer" data-aos="zoom-out">
          <h4>
            MEMBROS <span>{userInformations?.facRipos && userInformations.facRipos.length}/</span>
            <p>8</p>
          </h4>

          <div className="membersContainer">
            {userInformations?.facRipos && userInformations.facRipos.length > 0 ? (
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
          <p>{userInformations?.favoriteCar ? userInformations.favoriteCar : 'Nenhum'}</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma <AiFillStar className="icon" />
          </h4>
          <img src={Gun} alt="" />
          <p>{userInformations?.favoriteGun ? userInformations.favoriteGun : 'Nenhuma'}</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma Sec. <AiFillStar className="icon" />
          </h4>
          <img src={Knife} alt="" />
          <p>{userInformations?.favoriteSecondaryGun ? userInformations.favoriteSecondaryGun : 'Nenhuma'}</p>
        </div>
      </section>

      <section className="facCollectionContainer">
        <h4>
          COLEÇÃO <span>{userInformations?.ripos && userInformations.ripos.length}/</span>
          <p>{userInformations?.quantityTotalRiposPublic}</p>
        </h4>

        <div className="collectionContainer" data-aos="zoom-out">
          {userInformations?.ripos && userInformations.ripos.length > 0 ? (
            userInformations.ripos.map((ripo, index) => (
              <CollectionCharacter
                ripoId={ripo.id}
                ripoImage={ripo.ripoImage}
                ripoName={ripo.name}
                rarity={ripo.rarity}
                price={ripo.price}
                key={index}
                functionRemoveRipo={() => removeUserRipoFunction(ripo.id)}
              />
            ))
          ) : (
            <p style={{ opacity: '0.5' }}>Usuário não possui ripos.</p>
          )}
          <button className="cardAddRipo" onClick={() => setModalAddRipoIsOpen(true)}>
            <MdAdd className="icon" />
          </button>
        </div>
      </section>

      <section className="facGunsContainer">
        <h4>
          ARMAS <span>{userInformations?.guns ? userInformations.guns.length : '0'}/</span>
          <p>0</p>
        </h4>

        <div className="gunsContainer" data-aos="zoom-out">
          {userInformations?.guns && userInformations.guns.length > 0 ? (
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
          CARROS <span>{userInformations?.cars ? userInformations.cars.length : '0'}/</span>
          <p>0</p>
        </h4>

        <div className="carsContainer" data-aos="zoom-out">
          {userInformations?.cars && userInformations.cars.length > 0 ? (
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

export default UserPage;
