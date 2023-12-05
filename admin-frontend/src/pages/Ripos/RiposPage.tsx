import { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import RipoCard from '../../components/RipoCard/RipoCard';
import ModalEditRipo from './ModalEditRipo/ModalEditRipo';

import { IRipo } from './types';
import { api } from '../../services/api';

const RiposPage = () => {
  const [allRipos, setAllRipos] = useState<IRipo[]>([]);
  const [ripoSelected, setRipoSelected] = useState<IRipo>();

  const [searchInput, setSearchInput] = useState('');
  const searchRiposResult = allRipos.filter((ripo) => ripo.name.toLowerCase().includes(searchInput.toLowerCase()));

  const [modalEditRipoIsOpen, setModalEditRipoIsOpen] = useState(false);

  const getAllRiposFunction = async () => {
    const allRiposResponse = await api('/ripos/all');

    setAllRipos(allRiposResponse.data);
  };

  useEffect(() => {
    getAllRiposFunction();
  }, []);

  const handleClickSearchRipo = (ripo: IRipo) => {
    setRipoSelected(ripo);
    setSearchInput('');
    setModalEditRipoIsOpen(true);
  };

  return (
    <div className="riposPageContainer">
      <ModalEditRipo
        modalEditRipoIsOpen={modalEditRipoIsOpen}
        setModalEditRipoIsOpen={setModalEditRipoIsOpen}
        ripoInformations={ripoSelected}
        getRiposInformationsFunction={getAllRiposFunction}
      />

      <div className="titleAndSearchContainer">
        <SectionTitle title="Ripos" />

        <div className="searchInput">
          <input
            type="text"
            placeholder="Procure um ripo"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <div className="searchResultsContainer">
            {searchInput &&
              searchRiposResult.slice(0, 4).map((autCompleteRipo, index) => (
                <div
                  className="searchResult"
                  key={index}
                  data-aos="fade-in"
                  onClick={() => handleClickSearchRipo(autCompleteRipo)}
                >
                  <img src={autCompleteRipo.ripoImage} alt="" />
                  <p>{autCompleteRipo.name}</p>
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
          <RipoCard ripo={ripo} setModalEditRipoIsOpen={setModalEditRipoIsOpen} setRipoSelected={setRipoSelected} />
        ))}
      </div>
    </div>
  );
};

export default RiposPage;
