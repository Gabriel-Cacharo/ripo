import { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import Character from '../../assets/images/Boneco_Ind.png';

import UserCard from '../../components/UserCard/UserCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import { ISearch, IUser } from './types';
import { api } from '../../services/api';

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [searchAutocomplete, setSearchAutocomplete] = useState<ISearch[]>([]);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getAllUsersFunction = async () => {
      const allUsersResponse = await api('/users/all');

      setAllUsers(allUsersResponse.data);
    };

    getAllUsersFunction();
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
    <div className="usersPageContainer">
      <div className="titleAndSearchContainer">
        <SectionTitle title="Usuários" />

        <div className="searchInput">
          <input type="text" placeholder="Procure um usuário" onChange={(e) => setSearchInput(e.target.value)} />
          <div className="searchResultsContainer">
            {searchAutocomplete &&
              searchAutocomplete.map((autocomplete, index) => (
                <div
                  className="searchResult"
                  key={index}
                  data-aos="fade-in"
                  onClick={() => handleClickToSearchProfile(autocomplete.username)}
                >
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

      <div className="usersContainer">
        {allUsers.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
