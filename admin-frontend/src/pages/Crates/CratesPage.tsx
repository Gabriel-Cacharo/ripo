import { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import CrateCard from '../../components/CrateCard/CrateCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ModalEditCrate from './ModalEditCrate/ModalEditCrate';
import ModalEditCrateDrops from './ModalEditCrateDrops/ModalEditCrateDrops';

import { ICrate } from './types';
import { api } from '../../services/api';

const CratesPage = () => {
  const [allCrates, setAllCrates] = useState<ICrate[]>([]);
  const [crateSelected, setCrateSelected] = useState<ICrate>();

  const [searchInput, setSearchInput] = useState('');
  const searchCratesResult = allCrates.filter((crate) => crate.name.toLowerCase().includes(searchInput.toLowerCase()));

  const [modalEditCrateIsOpen, setModalEditCrateIsOpen] = useState<boolean>(false);
  const [modalEditCrateDropsIsOpen, setModalEditCrateDropsIsOpen] = useState<boolean>(false);

  const getAllCratesFunction = async () => {
    const allCratesResponse = await api('admin/crates/all');

    setAllCrates(allCratesResponse.data);
  };

  useEffect(() => {
    getAllCratesFunction();
  }, []);

  const handleClickSearchCrate = (crate: ICrate) => {
    setCrateSelected(crate);
    setSearchInput('');
    setModalEditCrateIsOpen(true);
  };

  return (
    <div className="cratesPageContainer">
      <ModalEditCrate
        modalEditCrateIsOpen={modalEditCrateIsOpen}
        setModalEditCrateIsOpen={setModalEditCrateIsOpen}
        crateInformations={crateSelected}
        getCratesInformationsFunction={getAllCratesFunction}
        setModalEditCrateDropsOpen={() => setModalEditCrateDropsIsOpen(true)}
      />

      <ModalEditCrateDrops
        modalEditCrateDropsIsOpen={modalEditCrateDropsIsOpen}
        setModalEditCrateDropsIsOpen={setModalEditCrateDropsIsOpen}
        crateInformations={crateSelected}
        getCratesInformationsFunction={getAllCratesFunction}
        setModalEditCrateIsOpen={setModalEditCrateIsOpen}
      />

      <div className="titleAndSearchContainer">
        <SectionTitle title="Caixas" />

        <div className="searchInput">
          <input
            type="text"
            placeholder="Procure uma caixa"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <div className="searchResultsContainer">
            {searchInput &&
              searchCratesResult.slice(0, 4).map((autCompleteCrate, index) => (
                <div
                  className="searchResult"
                  key={index}
                  data-aos="fade-in"
                  onClick={() => handleClickSearchCrate(autCompleteCrate)}
                >
                  <img src={autCompleteCrate.crateImage} alt="" />
                  <p>{autCompleteCrate.name}</p>
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
