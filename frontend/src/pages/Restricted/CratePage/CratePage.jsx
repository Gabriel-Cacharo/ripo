import Lottie from 'react-lottie';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import Cookies from 'js-cookie';

import CrateImage from '../../../assets/images/Caixa_fechada.png';
import CrateOpenedImage from '../../../assets/images/Caixa_aberta.png';
import CoinsIcon from '../../../assets/images/Coins_Icon.png';
import CharacterImage from '../../../assets/images/Boneco_Ind.png';
import RedeemCrateImage from '../../../assets/images/segurandoCaixa.png';
import BrilhoRaro from '../../../assets/images/Brilho_Raro.png';
import BrilhoLendario from '../../../assets/images/Brilho_Lendario.png';
import BrilhoComum from '../../../assets/images/Brilho_Comum.png';
import BrilhoIncomum from '../../../assets/images/Brilho_Incomum.png';
import Placa from '../../../assets/images/lendario_Caixa.png';

import SectionTitle from '../../../components/SectionTitle/SectionTitle';

import {
  animationLoadingLargeSettings,
  animationLoadingSmallSettings,
} from '../../../assets/animations/animationsSettings';

import { api } from '../../../services/api';

const CratePage = () => {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const [userCrates, setUserCrates] = useState([]);
  const [crateSelected, setCrateSelected] = useState();
  const [crateOpenedContent, setCrateOpenedContent] = useState();

  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });

  const [redeemCrateLoading, setRedeemCrateLoading] = useState(false);
  const [openCrateLoading, setOpenCrateLoading] = useState(false);

  const timeRemaining = Cookies.get('timeRemaining');

  useEffect(() => {
    getUserCratesFunction();
  }, []);

  const getUserCratesFunction = async () => {
    try {
      const userCratesResponse = await api(`/crates/getUserCrates`);

      setUserCrates(userCratesResponse.data);
    } catch (err) {
      setUserCrates([]);
    }
  };

  const redeemCrateFunction = async () => {
    setRedeemCrateLoading(true);

    try {
      await api.post(`/crates/redeem`);

      getUserCratesFunction();

      toast.success('Você resgatou uma caixa com sucesso!');
      setRedeemCrateLoading(false);
    } catch (err) {
      if (!err.response) {
        setRedeemCrateLoading(false);
        return toast.error('Ocorreu um erro ao resgatar a caixa. Tente novamente mais tarde');
      }

      const cooldownTime = err.response.data.error.replace('h', ' ').replace('m', '').split(' ');

      const hoursUserCanRedeemAgain = moment()
        .add(cooldownTime[0], 'hours')
        .add(cooldownTime[1], 'minutes')
        .format('HH:mm');

      const hoursOfStartDayUserCanRedeemAgain = moment()
        .startOf('day')
        .add(cooldownTime[0], 'hours')
        .add(cooldownTime[1], 'minutes')
        .format('HH:mm');

      const minutesUSerCanRedeemAgain = moment.duration(hoursOfStartDayUserCanRedeemAgain).asMinutes();
      const timeOfDayUserCanRedeemAgain = new Date(new Date().getTime() + minutesUSerCanRedeemAgain * 60 * 1000);

      Cookies.set('timeRemaining', hoursUserCanRedeemAgain, {
        expires: timeOfDayUserCanRedeemAgain,
      });

      if (err.response.data.error.includes('servidor')) {
        toast.error(err.response.data.error);
      } else {
        toast.error(`Você deve esperar ${err.response.data.error} para resgatar uma caixa novamente!`);
      }

      setRedeemCrateLoading(false);
    }
  };

  const buyCrateFunction = async () => {
    try {
      await api.post(`/crates/buy?crateId=1`);

      getUserCratesFunction();
      toast.success('Você comprou a caixa com sucesso');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const openCrateFunction = async () => {
    setOpenCrateLoading(true);
    setCrateOpenedContent('');

    try {
      await api.post(`/crates/open?crateId=${crateSelected.id}`).then((response) => {
        setTimeout(() => {
          setCrateOpenedContent(response.data);
          setCrateSelected('');
          setOpenCrateLoading(false);

          getUserCratesFunction();
        }, 5000);
      });
    } catch (err) {
      setOpenCrateLoading(false);
      toast.error(err.response.data.error);
    }
  };

  const renderCrateImage = () => {
    return openCrateLoading ? (
      <div data-aos="fade-in">
        <Lottie
          options={animationLoadingLargeSettings}
          height={window.innerWidth >= 650 ? 400 : 300}
          width={window.innerWidth >= 650 ? 400 : 300}
          isStopped={animationState.isStopped}
          isPaused={animationState.isPaused}
        ></Lottie>
      </div>
    ) : !openCrateLoading && !crateOpenedContent ? (
      <img src={CrateImage} alt="Crate Image" data-aos="zoom-out" />
    ) : (
      <div className="drawnItemContainer" style={{ backgroundImage: `url(${BrilhoLendario})` }}>
        <img src={Placa} alt="Item Rarity" className="itemRarity" />
        <img data-aos="zoom-in" src={crateOpenedContent.drawnRipo.ripoImage} alt="Crate Image" />
      </div>
    );
  };

  const renderCrateTexts = () => {
    return (
      <div className="textsContainer">
        {!crateOpenedContent && !openCrateLoading ? (
          <h4>Selecione uma caixa para abrir</h4>
        ) : !crateOpenedContent && openCrateLoading ? (
          <h4>Abrindo a caixa...</h4>
        ) : (
          <>
            <h4 data-aos="fade-in">
              Parabéns! Você ganhou um <b>Ripo</b>
            </h4>
            <div className="userItemDrawnOptionsContainer">
              {crateOpenedContent.userAlreadyHaveThisRipo ? (
                <div className="saveRepeatedContainer">
                  <button disabled></button>
                  <p>Repetido</p>
                </div>
              ) : (
                <button></button>
              )}
              <div className="sellItemContainer">
                <button></button>

                <div className="priceItemContainer">
                  <img src={CoinsIcon} alt="Coins Icon" />
                  <p>1600</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="cratePageContainer">
      <section className="redeemCrateContainer">
        <SectionTitle title={'Resgatar caixa'} secondPart={'.'} />

        <div className="middleContainer">
          <img src={RedeemCrateImage} alt="Crate Image" data-aos="fade-in" />
          <div className="textsContainer" data-aos="zoom-in">
            <h4>Resgate a sua caixa</h4>
            <p>
              {!timeRemaining
                ? 'Você pode resgatar uma caixa a cada 4 horas para tentar a sorte!'
                : 'Você poderá resgatar a sua próxima caixa no seguinte horário:'}
            </p>
            <button
              onClick={redeemCrateFunction}
              disabled={timeRemaining || redeemCrateLoading}
              className={timeRemaining && 'disabled'}
            >
              {redeemCrateLoading ? (
                <Lottie
                  options={animationLoadingSmallSettings}
                  height={70}
                  width={70}
                  isStopped={animationState.isStopped}
                  isPaused={animationState.isPaused}
                ></Lottie>
              ) : timeRemaining ? (
                String(timeRemaining)
              ) : (
                'Resgatar caixa'
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="myCratesSection">
        <SectionTitle title="Minhas caixas" secondPart="." />

        <div className="middleContainer">
          <div className="userCratesContainer">
            {userCrates.length === 0 && (
              <div className="userCratesContainerWithoutCrate">
                <p style={{ textAlign: 'center' }}>Você não possui caixas.</p>
              </div>
            )}
            {useMemo(() => {
              return (
                userCrates.length !== 0 &&
                userCrates.map((userCrate, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setCrateSelected(userCrate)}
                      style={{ background: 'transparent' }}
                    >
                      <img src={CrateImage} alt="" />
                    </button>
                  );
                })
              );
            }, [userCrates])}
          </div>

          <div className="openCrateContainer">
            {crateSelected && !openCrateLoading ? (
              <>
                <img src={CrateImage} alt="Crate Image" />

                <div className="textsContainer">
                  <h4>
                    Tente a sorte abrindo a caixa <b>{crateSelected.rarity}</b>
                  </h4>
                  <button type="button" onClick={() => openCrateFunction()}></button>
                </div>
              </>
            ) : (
              <>
                {renderCrateImage()}

                {renderCrateTexts()}
              </>
            )}
          </div>
        </div>

        <div className="crateContentContainer" {...events} ref={ref}>
          {crateSelected ? (
            crateSelected.riposDrop.map((drop, index) => {
              return <img key={index} src={drop} />;
            })
          ) : (
            <>
              <img src={CharacterImage} />
              <img src={CharacterImage} />
              <img src={CharacterImage} />
              <img src={CharacterImage} />
            </>
          )}
        </div>
      </section>

      <section className="buyCratesSection">
        <SectionTitle title="Comprar caixas" secondPart="." />

        <div className="buyCrateContainer">
          <img src={CrateOpenedImage} alt="Crate Opened Image" data-aos="zoom-in" />

          <div className="textsContainer" data-aos="zoom-in">
            <p>Você ganha coins vendendo seus Ripos ou de outras formas!</p>
            <p>Se você tem coins suficientes, pode comprar mais uma caixa para completar sua coleção.</p>

            <div className="textsInformationContainer">
              <div className="userCoins">
                <img src={CoinsIcon} alt="Coins icon" />
                <h5>1.000</h5>
              </div>

              <button type="button" onClick={buyCrateFunction}></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CratePage;
