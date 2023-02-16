import { toast } from 'react-toastify';
import { useState } from 'react';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import Character from '../../../assets/images/Boneco_Ind.png';
import CharacterNissin from '../../../assets/images/Personagem1.png';
import Car from '../../../assets/images/Carro_Ind1.png';
import Gun from '../../../assets/images/Arma_Ind1.png';
import Knife from '../../../assets/images/Arma_Ind2.png';

import { AiFillStar } from 'react-icons/ai';
import { api } from '../../../services/api';
import { useEffect } from 'react';

const FactionPage = () => {
  const [userInformations, setUserInformations] = useState([]);

  const getUserInformationsFunction = async () => {
    try {
      const userInformationsResponse = await api('/user/profile?userId=1');

      setUserInformations(userInformationsResponse.data);
    } catch (err) {
      setUserInformations([]);
    }
  };

  useEffect(() => {
    getUserInformationsFunction();
  }, []);

  return (
    <div className="factionPageContainer">
      <div className="facNameAndOwnerInformations">
        <SectionTitle
          title={userInformations.user && userInformations.user.fac ? userInformations.user.fac : 'Sem fac'}
          secondPart="."
        />
        <h5>{userInformations.user && userInformations.user.username}</h5>
      </div>

      <div className="facMembersInformationContainer">
        <div className="facOwnerImage" data-aos="fade-in">
          <img src={CharacterNissin} alt="Fac Owner Image" />
        </div>

        <div className="facMembersContainer" data-aos="zoom-out">
          <h4>
            MEMBROS <span>{userInformations.facRipos && userInformations.facRipos.length}/</span>
            <p>20</p>
          </h4>

          <div className="membersContainer">
            {userInformations.facRipos &&
              userInformations.facRipos.map((ripo, index) => (
                <div className="memberContainer" key={index}>
                  <img src={ripo.ripoImage} alt="" />
                  <p>{ripo.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="facInformationsContainer">
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Carro <AiFillStar className="icon" />
          </h4>
          <img src={Car} alt="" />
          <p>Skyline R34</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma <AiFillStar className="icon" />
          </h4>
          <img src={Gun} alt="" />
          <p>AK-47</p>
        </div>
        <div className="facInformationContainer" data-aos="fade-in">
          <h4>
            Arma Sec. <AiFillStar className="icon" />
          </h4>
          <img src={Knife} alt="" />
          <p>Faca</p>
        </div>
      </div>

      <div className="facCollectionContainer">
        <h4>
          COLEÇÃO <span>{userInformations.ripos && userInformations.ripos.length}/</span>
          <p>782</p>
        </h4>

        <div className="collectionContainer" data-aos="zoom-out">
          {userInformations.ripos &&
            userInformations.ripos.map((ripo, index) => (
              <div className="itemCollection" key={index}>
                <img src={ripo.ripoImage} alt="" />
                <p>{ripo.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="facGunsContainer">
        <h4>
          ARMAS <span>3/</span>
          <p>52</p>
        </h4>

        <div className="gunsContainer" data-aos="zoom-out">
          <div className="gunItem">
            <img src={Gun} alt="" />
            <p>AK-47</p>
          </div>
          <div className="gunItem">
            <img src={Knife} alt="" />
            <p>Faca</p>
          </div>
        </div>
      </div>

      <div className="facCarsContainer">
        <h4>
          CARROS <span>4/</span>
          <p>120</p>
        </h4>

        <div className="carsContainer" data-aos="zoom-out">
          <div className="carItem">
            <img src={Car} alt="" />
            <p>SKYLINE R34</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactionPage;
