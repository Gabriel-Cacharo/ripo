import { Link } from 'react-router-dom';
import NumbersContainer from '../../components/NumbersContainer/NumbersContainer';
import Slider from './components/Slider/Slider';

function Home() {
  return (
    <div>
      <main className="homeContainer">
        <div className="leftTextsContainer" data-aos="fade-in">
          <h3>
            RP<span>.</span>
          </h3>
          <p>Colecionáveis</p>
        </div>

        <div className="slideImagesCenter">
          <Slider />
        </div>

        <div className="rightTextsContainer" data-aos="zoom-in">
          <h5>COLECIONÁVEIS DE RP PARA VOCÊ MONTAR A FAC DOS SONHOS</h5>
          <p>Monte o grupo dos sonhos e colecione os Rips, armas, carros e roupas para customizar o seu próprio Rip!</p>

          <div className="rightTextsButtonsContainer">
            <Link to="/auth">ENTRAR</Link>
            <p>É DE GRAÇA!</p>
          </div>
        </div>

        <span data-aos="fade-down">
          Coleção <p>2 0 2 3</p>
        </span>
      </main>

      <NumbersContainer />
    </div>
  );
}

export default Home;
