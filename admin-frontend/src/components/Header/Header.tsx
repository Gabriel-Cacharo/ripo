import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Logo from '../../assets/images/Logo_canto.png';
// import MenuButtonImage from '../../assets/images/MenuCompleto.png';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { contextLogoutFunction, isAuthenticated } = useContext(AuthContext);

  // const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);

  return (
    <header className="headerContainer">
      <img src={Logo} alt="Logo Image" />

      {isAuthenticated && (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/crates">Caixas</Link>
              </li>
              <li>
                <Link to="/ripos">Ripos</Link>
              </li>
              <li>
                <Link to="/users">Usuários</Link>
              </li>
            </ul>
          </nav>

          <div className="rightHeaderButtons">
            <button type="button" onClick={contextLogoutFunction} className="logoutButton">
              <FiLogOut className="iconMarginRight" />
              Sair
            </button>

            {/* Hamburguer Menu */}
            {/* <DropdownMenu.Root open={dropdownMenuIsOpen}>
              <DropdownMenu.Trigger
                className="menuButton"
                style={{ background: 'transparent' }}
                onClick={() => setDropdownMenuIsOpen((s) => !s)}
              >
                <img src={MenuButtonImage} alt="Menu Button" />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdownMenuContent"
                  onInteractOutside={() => setDropdownMenuIsOpen((s) => !s)}
                >
                  <DropdownMenu.Item className="dropdownMenuItem">
                    <button type="button" onClick={contextLogoutFunction}>
                      <FiLogOut className="iconMarginRight" />
                      Sair
                    </button>
                  </DropdownMenu.Item>

                  <DropdownMenu.Arrow className="dropdownMenuArrow" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root> */}
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
