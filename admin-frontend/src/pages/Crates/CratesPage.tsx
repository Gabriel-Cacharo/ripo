import { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import CrateCard from '../../components/CrateCard/CrateCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import { ICrate } from './types';
import { api } from '../../services/api';
import ModalEditCrate from './ModalEditCrate/ModalEditCrate';

const CratesPage = () => {
  const [allCrates, setAllCrates] = useState<ICrate[]>([]);
  const [crateSelected, setCrateSelected] = useState<ICrate>();
  const [searchAutocomplete, setSearchAutocomplete] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState('');

  const [modalEditCrateIsOpen, setModalEditCrateIsOpen] = useState<boolean>(false);

  const getAllCratesFunction = async () => {
    const allCratesResponse = await api('admin/crates/all');

    setAllCrates(allCratesResponse.data);
  };

  useEffect(() => {
    getAllCratesFunction();
  }, []);

  // Search autocomplete
  const getAutoCompleteFunction = async () => {
    const autoCompleteResponse = await api.get(`/user/searchProfile/autocomplete?username=${searchInput}`);
    setSearchAutocomplete(autoCompleteResponse.data);
  };

  useEffect(() => {
    if (!searchInput) {
      setSearchAutocomplete([]);
      return;
    }

    getAutoCompleteFunction();
  }, [searchInput]);

  return (
    <div className="cratesPageContainer">
      <ModalEditCrate
        modalEditCrateIsOpen={modalEditCrateIsOpen}
        setModalEditCrateIsOpen={setModalEditCrateIsOpen}
        crateInformations={crateSelected}
        getCratesInformationsFunction={getAllCratesFunction}
      />

      <div className="titleAndSearchContainer">
        <SectionTitle title="Caixas" />

        <div className="searchInput">
          <input type="text" placeholder="Procure uma caixa" onChange={(e) => setSearchInput(e.target.value)} />
          <div className="searchResultsContainer">
            {searchAutocomplete &&
              searchAutocomplete.map((autocomplete, index) => (
                <div className="searchResult" key={index} data-aos="fade-in">
                  <img src="" alt="" />
                  <p>{autocomplete.name}</p>
                </div>
              ))}
          </div>
          <button>
            <AiOutlineSearch />
          </button>
        </div>
      </div>

      <div className="cratesContainer">
        {allCrates.map((crate) => (
          <CrateCard
            crate={crate}
            setModalEditCrateIsOpen={setModalEditCrateIsOpen}
            setCrateSelected={setCrateSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default CratesPage;
