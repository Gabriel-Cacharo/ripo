import { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import Character from '../../assets/images/Boneco_Ind.png';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import RipoCard from '../../components/RipoCard/RipoCard';

import { IRipo } from './types';
import { api } from '../../services/api';

const RiposPage = () => {
  const [allRipos, setAllRipos] = useState<IRipo[]>([]);
  const [searchAutocomplete, setSearchAutocomplete] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getAllRiposFunction = async () => {
      const allRiposResponse = await api('/ripos/all');

      setAllRipos(allRiposResponse.data);
    };

    getAllRiposFunction();
  }, []);

  return (
    <div className="riposPageContainer">
      <div className="titleAndSearchContainer">
        <SectionTitle title="Ripos" />

        <div className="searchInput">
          <input type="text" placeholder="Procure um ripo" onChange={(e) => setSearchInput(e.target.value)} />
          <div className="searchResultsContainer">
            {searchAutocomplete &&
              searchAutocomplete.map((autocomplete, index) => (
                <div className="searchResult" key={index} data-aos="fade-in" onClick={() => console.log('oi')}>
                  <img src={autocomplete.ripoId ? autocomplete.ripoId : Character} alt="User Ripo" />
                  <p>{autocomplete.username}</p>
                </div>
              ))}
          </div>
          <button>
            <AiOutlineSearch />
          </button>
        </div>
      </div>

      <div className="riposContainer">
        {allRipos.map((ripo) => (
          <RipoCard ripo={ripo} />
        ))}
      </div>
    </div>
  );
};

export default RiposPage;
