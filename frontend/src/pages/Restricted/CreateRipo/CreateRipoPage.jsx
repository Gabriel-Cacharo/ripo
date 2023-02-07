import Chracter from '../../../assets/images/Personagem1.png';
import Coins from '../../../assets/images/Coins_Icon.png';
import Cabelo from '../../../assets/images/cabelopng.png';

const CreateRipoPage = () => {
  return (
    <div className="createRipoPageContainer">
      <h3>
        Personalização <span>.</span>
      </h3>

      <div className="createRipoContainer">
        <div className="characterImageContainer">
          <img src={Chracter} alt="" />
        </div>

        <div className="createRipoOptionsContainer">
          <div className="createRipoHeader">
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption selected">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
            <div className="headerOption">
              <img src={Cabelo} alt="" />
            </div>
          </div>
          <div className="createRipoOptions">
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
            <img src={Cabelo} alt="" />
          </div>
          <div className="createRipoColors">
            <div className="colorOption" style={{ backgroundColor: '#FF0000' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#8B0000' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#DC143C' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FA8072' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF69B4' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF1493' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#C71585' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF6347' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF4500' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF8C00' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FFFF00' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#EE82EE' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#BA55D3' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FF00FF' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#8A2BE2' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#9400D3' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#7B68EE' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#90EE90' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#ADFF2F' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#00FF00' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#008B8B' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#00FFFF' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#7FFFD4' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#87CEFA' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#4169E1' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#0000CD' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#A52A2A' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#F4A460' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#FFFFFF' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#DCDCDC' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#A9A9A9' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#808080' }}></div>
            <div className="colorOption" style={{ backgroundColor: '#000000' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRipoPage;
