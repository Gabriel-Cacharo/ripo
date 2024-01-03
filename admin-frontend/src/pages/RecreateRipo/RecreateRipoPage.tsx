import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmRecreateRipoModal from './components/ConfirmRecreateRipoModal/ConfirmRecreateRipoModal';

import Chracter from '../../assets/images/Personagem1.png';
import Coins from '../../assets/images/Coins_Icon.png';
import Cabelo from '../../assets/images/cabelopng.png';
import Shirt from '../../assets/images/blusa1.png';
import Barba from '../../assets/images/barba1.png';
import Cabelo1 from '../../assets/images/cabelo1.png';
import Calca1 from '../../assets/images/calca1.png';
import PersonagemBase from '../../assets/images/persBase.png';

import { BsCheck } from 'react-icons/bs';

import { api } from '../../services/api';
import { IClothes } from './types';

const RecreateRipoPage = () => {
  const navigate = useNavigate();
  const { ripoId } = useParams();

  const [oldRipoImage, setOldRipoImage] = useState('');
  const [newRipoImage, setNewRipoImage] = useState('');

  const [modalConfirmRecreateIsOpen, setModalConfirmRecreateIsOpen] = useState(false);

  const [pageSelected, setPageSelected] = useState(0);
  const [clothesRipoSelected, setClothesRipoSelected] = useState({
    hair: '',
    beard: '',
    shirt: '',
    pants: '',
  });
  const [urlClothesRipoSelected, setUrlClothesRipoSelected] = useState({
    hair: '',
    beard: '',
    shirt: '',
    pants: '',
  });

  const [allClothesData, setAllClothesData] = useState({
    hair: [],
    beard: [],
    shirt: [],
    pants: [],
    shoes: [],
  });

  const [ripoName, setRipoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    type: '',
  });

  // Generate new Ripo image before open the confirm recreate modal is open
  const handleOpenConfirmEditRipoModal = async () => {
    await html2canvas(document.querySelector('.character') as HTMLElement, {
      backgroundColor: 'null',
      useCORS: true,
    }).then(async (canvas) => {
      var dataURL = canvas.toDataURL('image/png');

      setNewRipoImage(dataURL);
    });

    setModalConfirmRecreateIsOpen(true);
  };

  // Recreate ripo function
  const handleRecreateRipo = async () => {
    setLoading(true);

    if (!ripoName || !ripoName.trim()) {
      setLoading(false);
      setError({
        type: 'name',
      });
      return toast.error('Você dar um nome ao Ripo');
    }

    try {
      await html2canvas(document.querySelector('.character') as HTMLElement, {
        backgroundColor: 'null',
        useCORS: true,
      }).then(async (canvas) => {
        var dataURL = canvas.toDataURL('image/png');

        await api.put('/admin/ripos/editRipoImage', {
          ripoId: ripoId,
          ripoUrl: dataURL,
          ripoName: ripoName,
        });

        toast.success('O Ripo foi recriado com sucesso');
        setLoading(false);
        navigate('/ripos');
      });
    } catch (err) {
      setLoading(false);
      setError({
        type: 'all',
      });
      return toast.error('Ocorreu um erro ao recriar o ripo. Tente novamente mais tarde');
    }
  };

  const getOldRipoImage = async () => {
    try {
      const oldRipoImageResponse = await api(`/ripos/getRipoImage/${ripoId}`);

      setOldRipoImage(oldRipoImageResponse.data);
    } catch (err: any) {
      return toast.error(err.message);
    }
  };

  const getAllClothesData = async () => {
    const allClothesResponse = await api.get('/ripos/allClothes');

    setAllClothesData({
      hair: allClothesResponse.data.filter((clothes: IClothes) => clothes.type === 0),
      beard: allClothesResponse.data.filter((clothes: IClothes) => clothes.type === 1),
      shirt: allClothesResponse.data.filter((clothes: IClothes) => clothes.type === 2),
      pants: allClothesResponse.data.filter((clothes: IClothes) => clothes.type === 3),
      shoes: allClothesResponse.data.filter((clothes: IClothes) => clothes.type === 4),
    });
  };

  useEffect(() => {
    getAllClothesData();

    if (ripoId) {
      getOldRipoImage();
    }
  }, []);

  const handleSetClothesColor = (color: any) => {
    switch (pageSelected) {
      case 0:
        // Hair
        pageSelected === 0 &&
          clothesRipoSelected.hair[color] &&
          setUrlClothesRipoSelected({ ...urlClothesRipoSelected, hair: clothesRipoSelected.hair[color] });
        break;
      case 1:
        // Beard
        pageSelected === 1 &&
          clothesRipoSelected.beard[color] &&
          setUrlClothesRipoSelected({ ...urlClothesRipoSelected, beard: clothesRipoSelected.beard[color] });
        break;
      case 2:
        // Shirt
        pageSelected === 2 &&
          clothesRipoSelected.shirt[color] &&
          setUrlClothesRipoSelected({ ...urlClothesRipoSelected, shirt: clothesRipoSelected.shirt[color] });
        break;
      case 3:
        // Pants
        pageSelected === 3 &&
          clothesRipoSelected.pants[color] &&
          setUrlClothesRipoSelected({ ...urlClothesRipoSelected, pants: clothesRipoSelected.pants[color] });
        break;
    }
  };

  return (
    <>
      <ConfirmRecreateRipoModal
        handleRecreateRipo={handleRecreateRipo}
        loading={loading}
        modalConfirmRecreateIsOpen={modalConfirmRecreateIsOpen}
        newRipoImage={newRipoImage}
        oldRipoImage={oldRipoImage}
        setModalConfirmRecreateIsOpen={setModalConfirmRecreateIsOpen}
      ></ConfirmRecreateRipoModal>

      <div className="createRipoPageContainer">
        <h3>
          Personalização <span>.</span>
        </h3>

        <div className="createRipoContainer">
          <div className="characterImageContainer">
            <div className="character">
              <div className="hair" style={{ backgroundImage: `url(${urlClothesRipoSelected.hair})` }}></div>
              <div className="beard" style={{ backgroundImage: `url(${urlClothesRipoSelected.beard})` }}></div>
              <div className="shirt" style={{ backgroundImage: `url(${urlClothesRipoSelected.shirt})` }}></div>
              <div className="pants" style={{ backgroundImage: `url(${urlClothesRipoSelected.pants})` }}></div>
            </div>
          </div>

          <div className="createRipoOptionsContainer">
            <div className="createRipoHeader">
              <div
                className={`headerOption ${pageSelected === 0 ? 'selected' : ''}`}
                onClick={() => setPageSelected(0)}
              >
                <img src={Cabelo} alt="" />
              </div>
              <div
                className={`headerOption ${pageSelected === 1 ? 'selected' : ''}`}
                onClick={() => setPageSelected(1)}
              >
                <img src={Barba} alt="" />
              </div>
              <div
                className={`headerOption ${pageSelected === 2 ? 'selected' : ''}`}
                onClick={() => setPageSelected(2)}
              >
                <img src={Shirt} alt="" />
              </div>
              <div
                className={`headerOption ${pageSelected === 3 ? 'selected' : ''}`}
                onClick={() => setPageSelected(3)}
              >
                <img src={Calca1} alt="" />
              </div>
            </div>
            {pageSelected === 0 &&
              allClothesData.hair.map((clothes: IClothes) => {
                return (
                  <button
                    key={clothes.name}
                    className="createRipoOptions"
                    onClick={() => {
                      setClothesRipoSelected({ ...clothesRipoSelected, hair: clothes as any });
                      setUrlClothesRipoSelected({ ...clothesRipoSelected, hair: clothes.default });
                    }}
                  >
                    <img src={clothes.default} alt="" />
                  </button>
                );
              })}
            {pageSelected === 1 &&
              allClothesData.beard.map((clothes: IClothes) => {
                return (
                  <button
                    key={clothes.name}
                    className="createRipoOptions"
                    onClick={() => {
                      setClothesRipoSelected({ ...clothesRipoSelected, beard: clothes as any });
                      setUrlClothesRipoSelected({ ...urlClothesRipoSelected, beard: clothes.default });
                    }}
                  >
                    <img src={clothes.default} alt="" />
                  </button>
                );
              })}
            {pageSelected === 2 &&
              allClothesData.shirt.map((clothes: IClothes) => {
                return (
                  <button
                    key={clothes.name}
                    className="createRipoOptions"
                    onClick={() => {
                      setClothesRipoSelected({ ...clothesRipoSelected, shirt: clothes as any });
                      setUrlClothesRipoSelected({ ...urlClothesRipoSelected, shirt: clothes.default });
                    }}
                  >
                    <img src={clothes.default} alt="" />
                  </button>
                );
              })}
            {pageSelected === 3 &&
              allClothesData.pants.map((clothes: IClothes) => {
                return (
                  <button
                    key={clothes.name}
                    className="createRipoOptions"
                    onClick={() => {
                      setClothesRipoSelected({ ...clothesRipoSelected, pants: clothes as any });
                      setUrlClothesRipoSelected({ ...urlClothesRipoSelected, pants: clothes.default });
                    }}
                  >
                    <img src={clothes.default} alt="" />
                  </button>
                );
              })}
            <div className="createRipoColors">
              <button
                className="colorOption red"
                style={{ backgroundColor: '#FF0000' }}
                onClick={() => handleSetClothesColor('red')}
              ></button>
              <button
                className="colorOption darkRed"
                style={{ backgroundColor: '#8B0000' }}
                onClick={() => handleSetClothesColor('darkRed')}
              ></button>
              <button
                className="colorOption lightRed"
                style={{ backgroundColor: '#DC143C' }}
                onClick={() => handleSetClothesColor('lightRed')}
              ></button>
              <button
                className="colorOption salmon"
                style={{ backgroundColor: '#FA8072' }}
                onClick={() => handleSetClothesColor('salmon')}
              ></button>
              <button
                className="colorOption lightPink"
                style={{ backgroundColor: '#FF69B4' }}
                onClick={() => handleSetClothesColor('lightPink')}
              ></button>
              <button
                className="colorOption pink"
                style={{ backgroundColor: '#FF1493' }}
                onClick={() => handleSetClothesColor('pink')}
              ></button>
              <button
                className="colorOption darkPink"
                style={{ backgroundColor: '#C71585' }}
                onClick={() => handleSetClothesColor('darkPink')}
              ></button>
              <button
                className="colorOption lightOrange"
                style={{ backgroundColor: '#FF6347' }}
                onClick={() => handleSetClothesColor('lightOrange')}
              ></button>
              <button
                className="colorOption orange"
                style={{ backgroundColor: '#FF4500' }}
                onClick={() => handleSetClothesColor('orange')}
              ></button>
              <button
                className="colorOption darkYellow"
                style={{ backgroundColor: '#FF8C00' }}
                onClick={() => handleSetClothesColor('darkYellow')}
              ></button>
              <button
                className="colorOption yellow"
                style={{ backgroundColor: '#FFFF00' }}
                onClick={() => handleSetClothesColor('yellow')}
              ></button>
              <button
                className="colorOption lightPurple"
                style={{ backgroundColor: '#8A2BE2' }}
                onClick={() => handleSetClothesColor('lightPurple')}
              ></button>
              <button
                className="colorOption purple"
                style={{ backgroundColor: '#9400D3' }}
                onClick={() => handleSetClothesColor('purple')}
              ></button>
              <button
                className="colorOption lightPurpleWithBlue"
                style={{ backgroundColor: '#7B68EE' }}
                onClick={() => handleSetClothesColor('lightPurpleWithBlue')}
              ></button>
              <button
                className="colorOption lime"
                style={{ backgroundColor: '#90EE90' }}
                onClick={() => handleSetClothesColor('lime')}
              ></button>
              <button
                className="colorOption lightGreen"
                style={{ backgroundColor: '#ADFF2F' }}
                onClick={() => handleSetClothesColor('lightGreen')}
              ></button>
              <button
                className="colorOption green"
                style={{ backgroundColor: '#00FF00' }}
                onClick={() => handleSetClothesColor('green')}
              ></button>
              <button
                className="colorOption cyan"
                style={{ backgroundColor: '#008B8B' }}
                onClick={() => handleSetClothesColor('cyan')}
              ></button>
              <button
                className="colorOption lightCyan"
                style={{ backgroundColor: '#00FFFF' }}
                onClick={() => handleSetClothesColor('lightCyan')}
              ></button>
              <button
                className="colorOption ice"
                style={{ backgroundColor: '#87CEFA' }}
                onClick={() => handleSetClothesColor('ice')}
              ></button>
              <button
                className="colorOption lightBlue"
                style={{ backgroundColor: '#4169E1' }}
                onClick={() => handleSetClothesColor('lightBlue')}
              ></button>
              <button
                className="colorOption blue"
                style={{ backgroundColor: '#0000CD' }}
                onClick={() => handleSetClothesColor('blue')}
              ></button>
              <button
                className="colorOption beige"
                style={{ backgroundColor: '#F4A460' }}
                onClick={() => handleSetClothesColor('beige')}
              ></button>
              <button
                className="colorOption white"
                style={{ backgroundColor: '#FFFFFF' }}
                onClick={() => handleSetClothesColor('white')}
              ></button>
              <button
                className="colorOption darkWhite"
                style={{ backgroundColor: '#DCDCDC' }}
                onClick={() => handleSetClothesColor('darkWhite')}
              ></button>
              <button
                className="colorOption lightGray"
                style={{ backgroundColor: '#A9A9A9' }}
                onClick={() => handleSetClothesColor('lightGray')}
              ></button>
              <button
                className="colorOption gray"
                style={{ backgroundColor: '#808080' }}
                onClick={() => handleSetClothesColor('gray')}
              ></button>
              <button
                className="colorOption black"
                style={{ backgroundColor: '#000000' }}
                onClick={() => handleSetClothesColor('black')}
              ></button>
            </div>

            <div className="buttonsBottomContainer">
              <input
                onChange={(e) => setRipoName(e.target.value)}
                type="text"
                className={error.type === 'name' ? 'ripoNameInput error' : 'ripoNameInput'}
                placeholder="Digite o nome do Ripo..."
                onMouseDown={() => setError({ type: '' })}
              />

              <button
                className="finishCreateRipoButton"
                onClick={() => handleOpenConfirmEditRipoModal()}
                disabled={loading}
              >
                <BsCheck className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecreateRipoPage;
