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
  const [someOpenedCrate, setSomeOpenedCrate] = useState(false);

  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });

  const [loading, setLoading] = useState(false);

  const timeRemaining = Cookies.get('timeRemaining');

  useEffect(() => {
    // if (timeRemaining) {
    //   const timeRemainingSplit = timeRemaining.split('-');
    //   const timeRemainingHours = timeRemainingSplit[0].replace('h', ' ').replace('m', '');
    //   const timeRemainingFormatted = timeRemainingHours.split(' ');

    //   const hourLocalStoragePut = timeRemainingSplit[1].split(':');

    //   console.log(newDate.format('HH:mm'));
    // }

    getUserCratesFunction();
  }, []);

  const getUserCratesFunction = async () => {
    const userInfos = JSON.parse(localStorage.getItem('user'));

    const userCratesResponse = await api(`api/users/crates?id=${userInfos.id}`);

    setUserCrates(userCratesResponse.data);
  };

  const redeemCrateFunction = async () => {
    setLoading(true);

    try {
      await api('/api/users/getcrate');

      getUserCratesFunction();
      toast.success('Você resgatou uma caixa com sucesso!');
    } catch (err) {
      const cooldownTime = err.response.data.tempo.replace('h', ' ').replace('m', '').split(' ');

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
      toast.error(`Você deve esperar ${err.response.data.tempo} para resgatar uma caixa novamente!`);
      setLoading(false);
    }
  };

  const openCrateFunction = () => {};

  return (
    <div className="cratePageContainer">
      <section className="redeemCrateContainer">
        <h3>
          Resgatar caixa <span>.</span>
        </h3>

        <div className="middleContainer">
          <img src={RedeemCrateImage} alt="Crate Image" />
          <div className="textsContainer">
            <h4>Resgate a sua caixa</h4>
            <p>
              {!timeRemaining
                ? 'Você pode resgatar uma caixa a cada 4 horas para tentar a sorte!'
                : 'Você poderá resgatar a sua próxima caixa no seguinte horário:'}
            </p>
            <button
              onClick={redeemCrateFunction}
              disabled={timeRemaining || loading}
              className={timeRemaining && 'disabled'}
            >
              {loading ? (
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
        <h3>
          Minhas caixas <span>.</span>
        </h3>

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
            {crateSelected ? (
              <>
                <img src={CrateImage} alt="Crate Image" />

                <div className="textsContainer">
                  <h4>
                    Tente a sorte abrindo a caixa <b>{crateSelected.crate.attributes.rarity}</b>
                  </h4>
                  <button></button>
                </div>
              </>
            ) : (
              <>
                {loading ? (
                  <div data-aos="fade-in">
                    <Lottie
                      options={animationLoadingLargeSettings}
                      height={400}
                      width={400}
                      isStopped={animationState.isStopped}
                      isPaused={animationState.isPaused}
                    ></Lottie>
                  </div>
                ) : !loading && !someOpenedCrate ? (
                  <img src={CrateImage} alt="Crate Image" />
                ) : (
                  <img data-aos="zoom-in" src={CharacterImage} alt="Crate Image" style={{ marginRight: '30px' }} />
                )}

                <div className="textsContainer">
                  {!someOpenedCrate ? (
                    <h4>Selecione uma caixa para abrir</h4>
                  ) : (
                    <h4 data-aos="fade-up">
                      🎉🎉 Parabéns! Você ganhou uma caixa <b>Rara</b>
                    </h4>
                  )}
                  <button></button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="crateContentContainer" {...events} ref={ref}>
          {crateSelected ? (
            crateSelected.crate.drops.map((drop, index) => {
              return <img key={index} src={drop.image} />;
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
        <h3>
          Comprar caixas <span>.</span>
        </h3>

        <div className="buyCrateContainer">
          <img src={CrateOpenedImage} alt="Crate Opened Image" />

          <div className="textsContainer">
            <p>Você ganha coins vendendo seus Ripos ou de outras formas!</p>
            <p>Se você tem coins suficientes, pode comprar mais uma caixa para completar sua coleção.</p>

            <div className="textsInformationContainer">
              <div className="userCoins">
                <img src={CoinsIcon} alt="Coins icon" />
                <h5>1.000</h5>
              </div>

              <button></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CratePage;
