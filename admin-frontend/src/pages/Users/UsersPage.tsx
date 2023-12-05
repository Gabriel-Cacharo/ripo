import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineSearch } from 'react-icons/ai';

import UserCard from '../../components/UserCard/UserCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import { ISearch, IUser } from './types';
import { api } from '../../services/api';

const UsersPage = () => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const searchUsersResult = allUsers.filter((user) => user.username.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect(() => {
    const getAllUsersFunction = async () => {
      const allUsersResponse = await api('/users/all');

      setAllUsers(allUsersResponse.data);
    };

    getAllUsersFunction();
  }, []);

  const handleClickSearchUser = (user: IUser) => {
    setSearchInput('');
    navigate(`/user/${user.username}`);
  };

  return (
    <div className="usersPageContainer">
      <div className="titleAndSearchContainer">
        <SectionTitle title="Usuários" />

        <div className="searchInput">
          <input
            type="text"
            placeholder="Procure um usuário"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <div className="searchResultsContainer">
            {searchInput &&
              searchUsersResult.slice(0, 4).map((autoCompleteUser, index) => (
                <div
                  className="searchResult"
                  key={index}
                  data-aos="fade-in"
                  onClick={() => handleClickSearchUser(autoCompleteUser)}
                >
                  <img src={autoCompleteUser.ripoId.ripoImage} alt="" />
                  <p>{autoCompleteUser.username}</p>
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
