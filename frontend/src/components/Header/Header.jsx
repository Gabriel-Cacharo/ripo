import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Logo from '../../assets/images/Logo_canto.png';
import MenuButtonImage from '../../assets/images/MenuCompleto.png';
import CoinsImage from '../../assets/images/Coins_Icon.png';

import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  const userCoins = localStorage.getItem('user');

  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);

  return (
    <header className="headerContainer">
      <img src={Logo} alt="Logo Image" />

      <nav>
        {!isAuthenticated ? (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Sobre</Link>
            </li>
            <li>
              <Link to="/collection">Coleção</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/crate">Caixas</Link>
            </li>
            <li>
              <Link to="/about">Minha Coleção</Link>
            </li>
            <li>
              <Link to="/collection">Facção</Link>
            </li>
          </ul>
        )}
      </nav>

      <div className="rightHeaderButtons">
        {!isAuthenticated ? (
          <Link to="/auth" className="signInButton">
            <FaUserAlt className="iconMarginRight" /> CADASTRAR
          </Link>
        ) : (
          <div className="userCoinsContainer">
            <img src={CoinsImage} alt="Coins Image" className="iconMarginRight" />
            <p>{userCoins && JSON.parse(userCoins).coins}</p>
          </div>
        )}

        <DropdownMenu.Root open={dropdownMenuIsOpen}>
          <DropdownMenu.Trigger style={{ background: 'transparent' }}>
            <button className="menuButton" onClick={() => setDropdownMenuIsOpen((s) => !s)}>
              <img src={MenuButtonImage} alt="Menu Button" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="dropdownMenuContent"
              onInteractOutside={() => setDropdownMenuIsOpen((s) => !s)}
            >
              <DropdownMenu.Item className="dropdownMenuItem">
                <button>
                  <FiLogOut className="iconMarginRight" />
                  Sair
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}

export default Header;
