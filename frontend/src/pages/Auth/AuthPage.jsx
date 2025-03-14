import Lottie from 'react-lottie';
import { useState, useContext } from 'react';

import { FaUser, FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

import CharacterImage from '../../assets/images/Boneco_Ind.png';

import {
  animationLoadingLargeSettings,
  animationLoadingSmallSettings,
} from '../../assets/animations/animationsSettings';

import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';

import { verifyEmail, verifyPassword, verifyUser } from './utils/verifications';
import { Link } from 'react-router-dom';

function Register() {
  const { contextLoginFunction, contextRegisterFunction } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    type: '',
    message: '',
  });

  const [isLoginPage, setIsLoginPage] = useState(true);

  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });

  const setIsLoginPageFunction = () => {
    setIsLoginPage((c) => !c);

    setError({
      type: '',
      message: '',
    });
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  };

  const registerFunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError({
      type: '',
      message: '',
    });

    const verifyUserResponse = verifyUser(username);
    if (verifyUserResponse) {
      return setError({
        type: 'user',
        message: verifyUserResponse.message,
      });
    }

    const verifyEmailResponse = verifyEmail(email);
    if (verifyEmailResponse) {
      return setError({
        type: 'email',
        message: verifyEmailResponse.message,
      });
    }

    const verifyPasswordResponse = verifyPassword(password, confirmPassword);
    if (verifyPasswordResponse) {
      return setError({
        type: 'password',
        message: verifyPasswordResponse.message,
      });
    }

    const registerResponse = await contextRegisterFunction(email, password, username);

    if (registerResponse && registerResponse.type === 'error') {
      setError({
        type: 'all',
        message: registerResponse.error,
      });
      setLoading(false);
    }
  };

  const loginFunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError({
      type: '',
      message: '',
    });

    let loginResponse = await contextLoginFunction(email, password);
    if (loginResponse && loginResponse.type === 'error') {
      setError({
        type: 'all',
        message: loginResponse.error.error,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      {/* RegisterPage */}
      <main className="registerContainer" style={isLoginPage == false ? { display: 'flex' } : { display: 'none' }}>
        <div className="leftTextsContainer">
          <h3>
            RP<span>.</span>
          </h3>

          <p>Bem vindo ao</p>
        </div>

        <div className="formRegisterContainer">
          <form className="formRegister">
            <h5>CADASTRO</h5>

            <input
              type="text"
              placeholder="Usuário"
              className={error.type === 'user' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="email"
              placeholder="Email"
              className={error.type === 'email' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Senha"
              className={error.type === 'password' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="Repita a senha"
              className={error.type === 'password' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

            <div className="buttonsFormRegister">
              <p>
                Já possui uma conta? Faça
                <button type="button" onClick={setIsLoginPageFunction}>
                  login
                </button>
              </p>

              <button onClick={registerFunction} disabled={loading}>
                {loading ? (
                  <Lottie
                    options={animationLoadingSmallSettings}
                    height={40}
                    width={40}
                    isStopped={animationState.isStopped}
                    isPaused={animationState.isPaused}
                  ></Lottie>
                ) : (
                  <>
                    <FaUserAlt className="iconMarginRight" /> Cadastrar
                  </>
                )}
              </button>
            </div>

            <small className="errorContainer" style={error.message !== '' ? { display: 'block' } : { display: 'none' }}>
              {error.message}
            </small>
          </form>
        </div>

        <span>
          <img src={CharacterImage} alt="Character Image" />
          <p>Se registre e receba uma caixa de brinde!</p>
        </span>
      </main>

      {/* LoginPage */}
      <main className="loginContainer" style={isLoginPage ? { display: 'flex' } : { display: 'none' }}>
        <div className="formLoginContainer">
          <form className="formLogin">
            <h5>LOGIN</h5>

            <input
              type="email"
              placeholder="Email"
              className={error.type === 'username' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className={error.type === 'password' || error.type === 'all' ? 'error' : ''}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="buttonsFormLogin">
              <Link to="/auth/forgotPassword">
                <RiLockPasswordLine className="iconMarginRight" /> Esqueceu sua senha?
              </Link>

              <p>
                Não possui uma conta?
                <button type="button" onClick={setIsLoginPageFunction}>
                  Se registre
                </button>
              </p>
            </div>

            <button className="loginButton" onClick={loginFunction} disabled={loading}>
              {loading ? (
                <Lottie
                  options={animationLoadingSmallSettings}
                  height={40}
                  width={40}
                  isStopped={animationState.isStopped}
                  isPaused={animationState.isPaused}
                ></Lottie>
              ) : (
                <>
                  <FaUserAlt className="iconMarginRight" />
                  Logar
                </>
              )}
            </button>

            <small className="errorContainer" style={error.message !== '' ? { display: 'block' } : { display: 'none' }}>
              {error.message}
            </small>
          </form>
        </div>

        <div className="leftTextsContainer">
          <h3>
            RP<span>.</span>
          </h3>

          <p>Bem vindo ao</p>
        </div>
      </main>
    </div>
  );
}

export default Register;
