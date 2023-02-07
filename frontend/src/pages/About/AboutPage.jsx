import { FaQuestion } from 'react-icons/fa';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RiNumbersFill } from 'react-icons/ri';
import Logo from '../../assets/images/Botao_Guardar2.png';

function AboutPage() {
  return (
    <div className="aboutPageContainer">
      <div className="logoTopContainer">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="bottomTextsContainer">
        <div className="textContainer">
          <h3>
            <FaQuestion className="iconMarginRight" /> COMO FUNCIONA O SITE
          </h3>
          <p>
            Basicamente você pode abrir os pacotes gratuitamente a cada 4 horas! os Rips repetidos você pode vender por
            coins, que servem para você comprar mais pacotes de Rips, armas, carros ou roupas para seu Rip.
          </p>
        </div>

        <div className="textContainer">
          <h3>
            <AiOutlineFundProjectionScreen className="iconMarginRight" /> FUTUROS PROJETOS
          </h3>
          <p>
            Nós estamos criando alguns mini games para que você possa multiplicar seus coins e assim comprar mais
            pacotes! Esses projetos estão em desenvolvimento com muito carinho para que você possa se divertir ainda
            mais no site!
          </p>
        </div>

        <div className="textContainer">
          <h3>
            <RiNumbersFill className="iconMarginRight" /> NOSSOS NÚMEROS
          </h3>
          <p>- Em torno de 6.822 usuários no site</p>
          <p>- Cerca de 700 colecionáveis</p>
          <p>- Mais de 192.000 pacotes abertos pelos usuários</p>
          <p>- Mais de 1.233.190 horas logadas no site.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
