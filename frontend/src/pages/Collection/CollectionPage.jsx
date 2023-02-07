import CharacterImage1 from '../../assets/images/Personagem1.png';
import CharacterImage2 from '../../assets/images/Personagem2.png';
import CharacterImage3 from '../../assets/images/Personagem3.png';

import CharacterUndefined from '../../assets/images/Boneco_Ind.png';
import WeaponUndefined1 from '../../assets/images/Arma_Ind1.png';
import WeaponUndefined2 from '../../assets/images/Arma_Ind2.png';
import WeaponUndefined3 from '../../assets/images/Arma_Ind3.png';
import VehicleUndefined1 from '../../assets/images/Carro_Ind1.png';
import VehicleUndefined2 from '../../assets/images/Carro_Ind2.png';
import VehicleUndefined3 from '../../assets/images/Carro_Ind3.png';
import VehicleUndefined4 from '../../assets/images/Carro_Ind4.png';

function CollectionPage() {
  return (
    <main className="collectionPageContainer">
      <div className="topContainer">
        <img src={CharacterImage1} alt="Character Image" />
        <img src={CharacterImage2} alt="Character Image" />
        <img src={CharacterImage3} alt="Character Image" />
      </div>

      <div className="bottomInformationsContainer">
        <ul>
          <li>
            <div className="informationImagesContainer">
              <img src={CharacterUndefined} alt="Character Undefined Image" />
              <img src={CharacterUndefined} alt="Character Undefined Image" />
              <img src={CharacterUndefined} alt="Character Undefined Image" />
              <img src={CharacterUndefined} alt="Character Undefined Image" />
              <img src={CharacterUndefined} alt="Character Undefined Image" />
              <img src={CharacterUndefined} alt="Character Undefined Image" />
            </div>

            <h4>792</h4>
            <p>COLECIONÁVEIS</p>
          </li>
          <li>
            <div className="informationImagesContainer">
              <img src={WeaponUndefined1} alt="Weapon Undefined Image" />
              <img src={WeaponUndefined2} alt="Weapon Undefined Image" />
              <img src={WeaponUndefined3} alt="Weapon Undefined Image" />
            </div>

            <h4>53</h4>
            <p>ARMAS</p>
          </li>
          <li>
            <div className="informationImagesContainer">
              <img src={VehicleUndefined1} alt="Vehicle Undefined Image" />
              <img src={VehicleUndefined2} alt="Vehicle Undefined Image" />
              <img src={VehicleUndefined3} alt="Vehicle Undefined Image" />
              <img src={VehicleUndefined4} alt="Vehicle Undefined Image" />
            </div>

            <h4>132</h4>
            <p>VEÍCULOS</p>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default CollectionPage;
